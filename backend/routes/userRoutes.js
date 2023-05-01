const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");
const { protect, admin } = require("../middleware/authMiddleware");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

// Register user

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400);
      throw new Error(`User ${name} already exists`);
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User data");
    }
  })
);

router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// update user profile.
// It's going to be private therefore protected route
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id), // token necessary to fix bug
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.find({});
    res.json(user);
  })
);

// Get Users by ID

router.get(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// Delete User
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User removed" });
    } catch (err) {
      res.status(404);
      throw new Error(`User not found. ${err}`);
    }
  })
);

// Update/Edit user
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id); //not logged in but from id
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

module.exports = { router };
