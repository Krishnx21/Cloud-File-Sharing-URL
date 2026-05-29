// Postman
//    ↓
// file.routes.js
//    ↓
// multer middleware
//    ↓
// file.controller.js
//    ↓
// Cloudinary
//    ↓
// MongoDB

router.post(
  "/upload",
  verifyJWT,
  upload.single("file"),
  uploadFile
);