const express = require("express");
const router = express.Router();
const { Product } = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");

// Get all Products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
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
module.exports = { router };
