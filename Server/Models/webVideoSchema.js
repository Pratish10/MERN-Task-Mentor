const mongoose = require("mongoose");

const webCamVideoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    webCamVideoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const webCamVideoUrl = mongoose.model("webCamVideoUrl", webCamVideoSchema);
module.exports = webCamVideoUrl;
