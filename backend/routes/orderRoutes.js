const express = require("express");
const router = express.Router();
const { Order } = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      shippingPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(404);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  })
);

// Get an order by id
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    // first use of populate
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name",
      "email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
  })
);

module.exports = { router };
