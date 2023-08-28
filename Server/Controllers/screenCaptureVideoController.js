const asyncHandler = require("express-async-handler");
const ScreenCaptureVideoModel = require("../Models/screenVideoSchema");
const getDataUri = require("../Config/dataUri");
const cloudinary = require("cloudinary");

const uploadScreenCaptureVideo = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { screenCaptureVideo } = req.files;

    const screenCaptureVideoUrl = getDataUri(screenCaptureVideo[0]);
    // console.log("webcamvideo", webCamVideo);
    // console.log("webCamVideoUrl", webCamVideoUrl);

    if (!screenCaptureVideoUrl.content)
      return res.status(400).json({ warning: "Please upload the video" });

    const screenCaptureVideoResult = await cloudinary.v2.uploader.upload(
      screenCaptureVideoUrl.content,
      {
        resource_type: "video",
        folder: "ScreenCaptureVideo",
      }
    );

    const newScreenCaptureVideo = await ScreenCaptureVideoModel.create({
      user: userId,
      screenCaptureVideoUrl: screenCaptureVideoResult.secure_url,
    });

    if (newScreenCaptureVideo) {
      res.status(200).json({
        _id: newScreenCaptureVideo._id,
        user: userId,
        screenCaptureVideoUrl: screenCaptureVideoResult.secure_url,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error! uploading Data" });
    console.log("Error uploading Data", error.message);
  }
});

module.exports = { uploadScreenCaptureVideo };
