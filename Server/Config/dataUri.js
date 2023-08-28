const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  // console.log(extName);
  const file64 = parser.format(extName, file.buffer);
  return file64;
};

module.exports = getDataUri;
