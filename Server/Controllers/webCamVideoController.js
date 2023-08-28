const asyncHandler = require("express-async-handler");
const WebCamVideoModel = require("../Models/webVideoSchema");
const getDataUri = require("../Config/dataUri");
const cloudinary = require("cloudinary");

const uploadWebCamVideo = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { webCamVideo } = req.files;

    const webCamVideoUrl = getDataUri(webCamVideo[0]);
    // console.log("webcamvideo", webCamVideo);
    // console.log("webCamVideoUrl", webCamVideoUrl);

    if (!webCamVideoUrl.content)
      return res.status(400).json({ warning: "Please upload the video" });

    const webCamVideoResult = await cloudinary.v2.uploader.upload(
      webCamVideoUrl.content,
      {
        resource_type: "video",
        folder: "webCamVideo",
      }
    );

    const newWebCamVideo = await WebCamVideoModel.create({
      user: userId,
      webCamVideoUrl: webCamVideoResult.secure_url,
    });

    if (newWebCamVideo) {
      res.status(200).json({
        _id: newWebCamVideo._id,
        user: userId,
        webCamVideoUrl: webCamVideoResult.secure_url,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error! uploading Data" });
    console.log("Error uploading Data", error.message);
  }
});

module.exports = { uploadWebCamVideo };
