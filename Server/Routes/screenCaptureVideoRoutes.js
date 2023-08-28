const express = require("express");
const multer = require("multer");
const authenticate = require("../Middlewares/authenticate");
const router = express.Router();
const getSingleUploadMiddleware = require("../Config/multer");
const {
  uploadScreenCaptureVideo,
} = require("../Controllers/screenCaptureVideoController");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadScreenCaptureSingle =
  getSingleUploadMiddleware("screenCaptureVideo");

router.post(
  "/upload/:userId",
  upload.fields([{ name: "screenCaptureVideo", maxCount: 1 }]),
  authenticate.User,
  uploadScreenCaptureVideo,
  uploadScreenCaptureSingle
);

module.exports = router;
