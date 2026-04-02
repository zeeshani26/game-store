const express = require("express");
const router = express.Router();
const { Order } = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../middleware/authMiddleware");
const { reserveStock, releaseStock } = require("../utils/reserveStock");

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
    }

    await reserveStock(orderItems);

    try {
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
    } catch (e) {
      await releaseStock(orderItems);
      throw e;
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

// Cancel unpaid order (restores stock)
router.put(
  "/:id/cancel",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    if (
      order.user.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      res.status(403);
      throw new Error("Not authorized to cancel this order");
    }
    if (order.isCancelled) {
      res.status(400);
      throw new Error("Order is already cancelled");
    }
    if (order.isPaid) {
      res.status(400);
      throw new Error("Paid orders cannot be cancelled here");
    }

    await releaseStock(order.orderItems);
    order.isCancelled = true;
    order.cancelledAt = new Date();
    const updated = await order.save();
    res.json(updated);
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

// get all orders
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name"); // from user I want to get id and name
    res.json(orders);
  })
);

// Update order to Delivered
router.put(
  "/:id/delivered",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

module.exports = { router };
