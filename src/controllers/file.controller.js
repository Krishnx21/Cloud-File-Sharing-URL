// file.controller.js
// 1. Get uploaded file from req.file
// 2. Validate file exists
// 3. Upload file to Cloudinary
// 4. Save Cloudinary URL in database
// 5. Generate shareable link
// 6. Send response to frontend
//
// Simple flow:
// frontend/Postman -> file.routes.js -> multer -> req.file
// req.file -> Cloudinary upload -> MongoDB save -> response

console.log("[file.controller.js] File controller loaded only if a route imports uploadFile/getFileById.");
console.log("[file.controller.js] Current status: these functions are draft placeholders, so no upload logic runs yet.");

export const uploadFile = async (req, res) => {
  console.log("[file.controller.js/uploadFile] Route hit: uploadFile controller entered.");
  console.log("[file.controller.js/uploadFile] req.file received from multer middleware:", req.file);
  console.log("[file.controller.js/uploadFile] req.body received with any extra form fields:", req.body);
  console.log("[file.controller.js/uploadFile] Next future step: upload req.file to Cloudinary, save database record, then send response.");
  // This function will handle file upload logic later.
  // req.file will come from multer middleware.
};

export const getFileById = async (req, res) => {
  console.log("[file.controller.js/getFileById] Route hit: getFileById controller entered.");
  console.log("[file.controller.js/getFileById] req.params received from URL:", req.params);
  console.log("[file.controller.js/getFileById] Next future step: query MongoDB for this file id, then send response.");
  // This function will find one file by id later.
  // req.params.id can be used to get file id from URL.
};
