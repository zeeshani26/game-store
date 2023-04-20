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

// get logged in users orders.
router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  })
);

// Get an order by id
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    // first use of populate
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Update order topaid
router.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // payment result req.body will come from paypal. Find another way for UPI.
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// get logged in users orders.
router.get(
  "/myorders",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.findById({ user: req.user._id });
    res.json(orders);
  })
);

module.exports = { router };
