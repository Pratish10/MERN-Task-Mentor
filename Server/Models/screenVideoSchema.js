const mongoose = require("mongoose");

const screenCaptureVideoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    screenCaptureVideoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const ScreenCaptureUrl = mongoose.model(
  "ScreenCaptureUrl",
  screenCaptureVideoSchema
);
module.exports = ScreenCaptureUrl;
