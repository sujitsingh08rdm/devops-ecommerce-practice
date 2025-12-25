const cloudinary = require("cloudinary").v2;
const multer = require("multer");

//This part configures the Cloudinary client with your account details (cloud_name, api_key, and api_secret).
//It lets your server-side code connect securely to your Cloudinary account to upload images or other files.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SCRIPT,
});

//Multer is a Node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
//memoryStorage() tells Multer to store uploaded files in memory (RAM) instead of writing them to disk.
const storage = new multer.memoryStorage();

/*imageUploadUtil is an async function that:
Receives a file (in your case, it expects a base64 string or a path, but more likely you should convert the buffer to base64 — small adjustment needed; I'll explain shortly).
Uploads it to Cloudinary using cloudinary.uploader.upload().
The resource_type: "auto" tells Cloudinary to automatically detect whether the upload is an image, video, or something else.
Finally, it returns the result of the upload (usually includes URL, public ID, etc.).*/

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

//upload is a configured Multer middleware

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
