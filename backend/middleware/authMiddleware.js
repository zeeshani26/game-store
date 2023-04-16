const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      // fetch the users through decoded id everything except password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Token not found");
  }
});

module.exports = { protect };
