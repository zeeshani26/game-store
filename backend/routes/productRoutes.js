const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Product } = require("../models/productModel");
const {
  mergeCategoryList,
  buildCategoryFilterQuery,
  combineSearchAndCategory,
} = require("../utils/catalogCategories");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");

const CATALOG_MAX = 500;

async function sendFullCatalog(req, res) {
  const search = req.query.search
    ? { name: { $regex: req.query.search, $options: "i" } }
    : {};

  const categoryFilter = buildCategoryFilterQuery(req.query.category);
  const filter = combineSearchAndCategory(search, categoryFilter);

  let sortOption = {};
  switch (req.query.sort) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "rating":
      sortOption = { rating: -1 };
      break;
    case "name":
      sortOption = { name: 1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const products = await Product.find(filter)
    .sort(sortOption)
    .limit(CATALOG_MAX)
    .lean();

  const categoryLabels = await Product.distinct("category");
  const categories = mergeCategoryList(categoryLabels);

  res.json({
    products,
    page: 1,
    TotalPages: 1,
    categories,
  });
}

// Get all Products (search, category, sort, pagination)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.fullCatalog === "1") {
      return sendFullCatalog(req, res);
    }

    const pageSize = Math.min(
      100,
      Math.max(1, Number(req.query.pageSize) || 4)
    );
    const page = Number(req.query.pageNumber) || 1;

    const search = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {};

    const categoryFilter = buildCategoryFilterQuery(req.query.category);

    const filter = combineSearchAndCategory(search, categoryFilter);

    let sortOption = {};
    switch (req.query.sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "rating":
        sortOption = { rating: -1 };
        break;
      case "name":
        sortOption = { name: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const categoryLabels = await Product.distinct("category");
    const categories = mergeCategoryList(categoryLabels);

    res.json({
      products,
      page,
      TotalPages: Math.max(1, Math.ceil(count / pageSize)),
      categories,
    });
  })
);

// Distinct categories (must be before /:id)
router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const raw = await Product.distinct("category");
    res.json(mergeCategoryList(raw));
  })
);

// Recently viewed — resolve multiple IDs in display order
router.post(
  "/lookup",
  asyncHandler(async (req, res) => {
    const ids = req.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.json([]);
    }
    const limited = ids
      .slice(0, 12)
      .filter((id) => mongoose.Types.ObjectId.isValid(id));
    const found = await Product.find({ _id: { $in: limited } });
    const map = new Map(found.map((p) => [p._id.toString(), p]));
    const ordered = limited
      .map((id) => map.get(String(id)))
      .filter(Boolean);
    res.json(ordered);
  })
);

// Get Top Rated Product
router.get(
  "/top",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  })
);

// Get single Product
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404);
      throw new Error("Product not found");
    }
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);
// Delete single product
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(404);
      throw new Error(`Product not found.${err}`);
    }
  })
);

// Create a product (only when admin submits the form — body required)
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      category,
      countInStock,
      publisher,
    } = req.body;

    const trimmedName = name != null ? String(name).trim() : "";
    if (!trimmedName) {
      res.status(400);
      throw new Error("Product name is required");
    }

    const product = new Product({
      name: trimmedName,
      price: Number(price),
      user: req.user._id,
      image: image && String(image).trim() ? String(image).trim() : "/images/cover_sample.jpg",
      description: description != null ? String(description) : "",
      publisher: publisher != null && String(publisher).trim() ? String(publisher).trim() : "—",
      category: category != null && String(category).trim() ? String(category).trim() : "—",
      countInStock: Number(countInStock) >= 0 ? Number(countInStock) : 0,
      numReviews: 0,
      rating: 0,
    });

    if (Number.isNaN(product.price) || product.price < 0) {
      res.status(400);
      throw new Error("Valid price is required");
    }

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  })
);

// Update a product
router.patch(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      category,
      countInStock,
      publisher,
    } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, // id is in the url
        {
          name,
          price,
          description,
          image,
          category,
          countInStock,
          publisher,
        },
        { new: true } // return the updated document
      );
      res.json(updatedProduct);
    } catch (err) {
      res.status(404);
      throw new Error(err);
    }
  })
);

// Post a Product Review
router.post(
  "/:id/reviews",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = { router };
