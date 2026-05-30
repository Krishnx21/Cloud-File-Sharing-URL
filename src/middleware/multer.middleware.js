// multer.middleware.js
// 1. Import multer
// 2. Decide where uploaded files are stored temporarily
// 3. Decide uploaded file name
// 4. Export upload middleware
// 5. Routes can use upload.single("file") to read one file
import multer from "multer";

console.log("[multer.middleware.js] Multer middleware file loaded when a file route imports upload.");
console.log("[multer.middleware.js] Next step: configure temporary disk storage for incoming uploaded files.");

// diskStorage means multer first saves uploaded file on this computer/server.
const storage = multer.diskStorage({
  // Store uploaded files in public/temp folder.
  destination: function (req, file, cb) {
    console.log("[multer.middleware.js/destination] Multer received an upload and is choosing the temporary folder.");
    console.log("[multer.middleware.js/destination] req.body received so far:", req.body);
    console.log("[multer.middleware.js/destination] file metadata received:", file);
    console.log("[multer.middleware.js/destination] Data going out to multer callback: ./public/temp. Next function: filename().");
    cb(null, "./public/temp");
  },

  // Keep original uploaded file name.
  filename: function (req, file, cb) {
    console.log("[multer.middleware.js/filename] Multer is choosing the stored filename.");
    console.log("[multer.middleware.js/filename] Original uploaded filename received:", file.originalname);
    console.log("[multer.middleware.js/filename] Data going out to multer callback:", file.originalname);
    console.log("[multer.middleware.js/filename] Next file/function: controller receives req.file after multer finishes.");
    cb(null, file.originalname);
  }
});

// upload is middleware used in routes before controller.
console.log("[multer.middleware.js] Creating upload middleware with disk storage. Data going out: upload is exported for routes.");
export const upload = multer({
  storage
});
