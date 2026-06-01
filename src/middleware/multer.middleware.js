// multer.middleware.js
// 1. Import multer
// 2. Keep uploaded files in memory before sending to Cloudinary
// 4. Export upload middleware
// 5. Routes can use upload.single("file") to read one file
import multer from "multer";

console.log("[multer.middleware.js] Multer middleware file loaded when a file route imports upload.");
console.log("[multer.middleware.js] Next step: configure memory storage for incoming uploaded files.");

// memoryStorage avoids Windows/OneDrive temp-file locks and unlink EPERM errors.
const storage = multer.memoryStorage();

// upload is middleware used in routes before controller.
console.log("[multer.middleware.js] Creating upload middleware with memory storage. Data going out: upload is exported for routes.");
export const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024
  }
});
