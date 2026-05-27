import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload function
const uploadOnCloudinary = async (localFilePath) => {
  try {

    // Check if file exists
    if (!localFilePath) return null;

    // Upload file to cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto"
      }
    );

    console.log("File uploaded successfully on Cloudinary");

    // Return uploaded file response
    return response;

  } catch (error) {

    // Remove local file if upload fails
    fs.unlinkSync(localFilePath);

    console.log("Cloudinary upload failed", error);

    return null;
  }
};

export { uploadOnCloudinary };