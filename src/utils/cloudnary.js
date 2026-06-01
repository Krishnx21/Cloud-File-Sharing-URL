// cloudnary.js
// 1. Import Cloudinary SDK
// 2. Import fs to delete local files if upload fails
// 3. Configure Cloudinary using .env values
// 4. Upload local file to Cloudinary
// 5. Return Cloudinary response with URL and public_id
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

console.log("[cloudnary.js] Cloudinary utility file loaded because a controller imported uploadOnCloudinary().");
console.log("[cloudnary.js] Next step: configure Cloudinary with .env values.");

// Connect this backend with your Cloudinary account.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("[cloudnary.js] Cloudinary config completed. Incoming cloud_name exists:", Boolean(process.env.CLOUDINARY_CLOUD_NAME));
console.log("[cloudnary.js] Data going out: uploadOnCloudinary() can now call cloudinary.uploader.upload().");

const getCloudinaryResourceType = (mimetype = "") => {
  if (mimetype.startsWith("image/") || mimetype.startsWith("video/")) {
    return "auto";
  }

  return "raw";
};

// Upload one local file path to Cloudinary.
const uploadOnCloudinary = async (localFilePath, mimetype) => {
  console.log("[cloudnary.js/uploadOnCloudinary] Upload helper entered from a controller.");
  console.log("[cloudnary.js/uploadOnCloudinary] Incoming local file path:", localFilePath);
  console.log("[cloudnary.js/uploadOnCloudinary] Incoming mimetype:", mimetype);
  console.log("[cloudnary.js/uploadOnCloudinary] Next step: validate file path before upload.");
  try {
    // If no file path is provided, return null.
    if (!localFilePath) {
      console.log("[cloudnary.js/uploadOnCloudinary] No file path received. Data going out: null to controller.");
      return null;
    }

    const resourceType = getCloudinaryResourceType(mimetype);

    // Upload file. Non-image documents should be raw assets so browsers receive the original file.
    console.log("[cloudnary.js/uploadOnCloudinary] Cloudinary upload starting. Data going in:", { localFilePath, resource_type: resourceType });
    const response = await cloudinary.uploader.upload(
      localFilePath,
      {
        resource_type: resourceType
      }
    );

    console.log("File uploaded successfully on Cloudinary");
    console.log("[cloudnary.js/uploadOnCloudinary] Cloudinary upload completed. Response from Cloudinary:", response);

    // Return Cloudinary response to controller.
    console.log("[cloudnary.js/uploadOnCloudinary] Data going out to controller: Cloudinary response with URL/public_id.");
    return response;
  } catch (error) {
    console.log("[cloudnary.js/uploadOnCloudinary] Error caught during Cloudinary upload:", error);
    console.log("[cloudnary.js/uploadOnCloudinary] Next step: delete local temp file so storage does not fill up.");
    // Remove local file if upload fails, so temp folder does not fill up.
    fs.unlinkSync(localFilePath);

    console.log("Cloudinary upload failed", error);

    console.log("[cloudnary.js/uploadOnCloudinary] Data going out to controller after failed upload: null.");
    return null;
  }
};

export { uploadOnCloudinary };
