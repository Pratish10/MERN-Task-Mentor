const express = require("express");
const multer = require("multer");
const authenticate = require("../Middlewares/authenticate");
const { uploadWebCamVideo } = require("../Controllers/webCamVideoController");
const router = express.Router();
const getSingleUploadMiddleware = require("../Config/multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadWebCamVideoSingle = getSingleUploadMiddleware("webCamVideo");

router.post(
  "/upload/:userId",
  upload.fields([{ name: "webCamVideo", maxCount: 1 }]),
  authenticate.User,
  uploadWebCamVideo,
  uploadWebCamVideoSingle
);

module.exports = router;
