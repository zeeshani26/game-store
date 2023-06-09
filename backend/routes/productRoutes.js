const express = require("express");
const router = express.Router();
const { Product } = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");

// Get all Products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    if (req.query.search === "" && req.query.pageNumber === "") {
      const products = await Product.find({});
      res.json({ products });
    }
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const search = req.query.search
      ? { name: { $regex: req.query.search, $options: "i" } }
      : {}; // options i for case insensitive

    const count = await Product.countDocuments({ ...search });
    const products = await Product.find({ ...search })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, TotalPages: Math.ceil(count / pageSize) });
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

// Create a product
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = new Product({
      name: "ABCXYZ",
      price: 0,
      user: req.user._id, // logged in user
      image: "/images/cover_sample.jpg",
      description: "Sample description",
      publisher: "Sample publisher",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
    });
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
