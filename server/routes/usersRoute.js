const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateTokens");
const authMiddleware = require("../middleware/authMiddleware");
const userRoute = express.Router();
// register route
userRoute.route("/register").post(
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("user exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        token: generateToken(userCreated._id),
      });
    }
  }),
);

//login route

userRoute.route("/login").post(
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error(
        "user doesnt exist or password is not matching or invalid credential",
      );
    }
  }),
);

userRoute.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = userRoute;
