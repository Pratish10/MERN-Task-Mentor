const express = require("express");
const { registerUser, loginUser } = require("../Controllers/userControllers");
const validate = require("../Middlewares/validate");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Your name is required"),
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("You must type a password at least 6 chars long"),
    check("confirmPassword")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .custom((value, { req }) => value === req.body.password)
      .withMessage("The passwords do not match"),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("You must type a password at least 6 chars long"),
  ],
  validate,
  loginUser
);

module.exports = router;
