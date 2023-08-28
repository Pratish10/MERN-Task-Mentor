const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const passport = require("passport");
const morgan = require("morgan");
const cloudinary = require("./Config/cloudinary.js");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
require("./Middlewares/jwt")(passport);

connectDB();
cloudinary;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "You are in Auth endpoint. Register or Login to test Auth",
  });
});

// user routes
app.use("/api/user", require("./Routes/userRoutes"));

// webcam routes
app.use("/api/webcam", require("./Routes/webcamVideoRoutes"));

// acreen routes
app.use("/api/screencapture", require("./Routes/screenCaptureVideoRoutes"));

app.listen(PORT, console.log(`Server is listening on PORT:${PORT}`));
