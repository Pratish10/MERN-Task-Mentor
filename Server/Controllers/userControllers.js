const asyncHandler = require("express-async-handler");
const User = require("../Models/userSchema");
const generateToken = require("../Middlewares/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(401)
        .json({ message: "Error! User already registered" });

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: "Bearer " + generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400);
    console.log("Error creating user", error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "Please provide valid email-id and password",
      });

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: "Bearer " + generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        message: "Please provide valid email-id and password",
      });
    }
  } catch (error) {
    res.status(400);
    console.log("Error loging user:", error.message);
  }
});

module.exports = { registerUser, loginUser };
