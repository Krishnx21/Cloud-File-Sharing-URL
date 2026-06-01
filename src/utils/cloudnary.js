// cloudnary.js
// 1. Import Cloudinary SDK
// 2. Configure Cloudinary using .env values
// 3. Upload file buffer to Cloudinary
// 5. Return Cloudinary response with URL and public_id
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

console.log("[cloudnary.js] Cloudinary utility file loaded because a controller imported uploadBufferOnCloudinary().");
console.log("[cloudnary.js] Next step: configure Cloudinary with .env values.");

// Connect this backend with your Cloudinary account.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("[cloudnary.js] Cloudinary config completed. Incoming cloud_name exists:", Boolean(process.env.CLOUDINARY_CLOUD_NAME));
console.log("[cloudnary.js] Data going out: uploadBufferOnCloudinary() can now call cloudinary.uploader.upload_stream().");

const getCloudinaryResourceType = (mimetype = "") => {
  if (mimetype.startsWith("image/") || mimetype.startsWith("video/")) {
    return "auto";
  }

  return "raw";
};

const uploadBufferOnCloudinary = async (fileBuffer, mimetype, originalName) => {
  console.log("[cloudnary.js/uploadBufferOnCloudinary] Upload helper entered from a controller.");
  console.log("[cloudnary.js/uploadBufferOnCloudinary] Incoming file metadata:", {
    hasBuffer: Boolean(fileBuffer),
    mimetype,
    originalName
  });

  if (!fileBuffer) {
    console.log("[cloudnary.js/uploadBufferOnCloudinary] No file buffer received. Data going out: null to controller.");
    return null;
  }

  const resourceType = getCloudinaryResourceType(mimetype);

  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        filename_override: originalName
      },
      (error, response) => {
        if (error) {
          console.log("[cloudnary.js/uploadBufferOnCloudinary] Cloudinary upload failed:", error);
          resolve(null);
          return;
        }

        console.log("[cloudnary.js/uploadBufferOnCloudinary] Cloudinary upload completed. Response:", response);
        resolve(response);
      }
    );

    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

export { uploadBufferOnCloudinary };
