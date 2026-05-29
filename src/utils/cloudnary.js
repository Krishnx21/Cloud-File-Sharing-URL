// cloudnary.js
// 1. Import Cloudinary SDK
// 2. Import fs to delete local files if upload fails
// 3. Configure Cloudinary using .env values
// 4. Upload local file to Cloudinary
// 5. Return Cloudinary response with URL and public_id
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Connect this backend with your Cloudinary account.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload one local file path to Cloudinary.
const uploadOnCloudinary = async (localFilePath) => {
  try {
    // If no file path is provided, return null.
    if (!localFilePath) return null;

    // Upload file. resource_type auto means image/video/pdf/etc can be detected.
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: "auto"
      }
    );

    console.log("File uploaded successfully on Cloudinary");

    // Return Cloudinary response to controller.
    return response;
  } catch (error) {
    // Remove local file if upload fails, so temp folder does not fill up.
    fs.unlinkSync(localFilePath);

    console.log("Cloudinary upload failed", error);

    return null;
  }
};

export { uploadOnCloudinary };
