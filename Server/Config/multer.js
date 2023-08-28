const multer = require("multer");
const storage = multer.memoryStorage();
const getSingleUploadMiddleware = (fieldName) => {
  return multer({ storage }).single(fieldName);
};

module.exports = getSingleUploadMiddleware;
