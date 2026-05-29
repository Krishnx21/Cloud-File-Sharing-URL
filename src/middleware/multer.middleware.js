// multer.middleware.js
// 1. Import multer
// 2. Decide where uploaded files are stored temporarily
// 3. Decide uploaded file name
// 4. Export upload middleware
// 5. Routes can use upload.single("file") to read one file
import multer from "multer";

// diskStorage means multer first saves uploaded file on this computer/server.
const storage = multer.diskStorage({
  // Store uploaded files in public/temp folder.
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  // Keep original uploaded file name.
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// upload is middleware used in routes before controller.
export const upload = multer({
  storage
});
