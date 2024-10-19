const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dd3wlco6o",
  api_key: "433767824718687",
  api_secret: "f7FmerilVl7SQ8vBvqYZiA9vIAM",
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtils };
