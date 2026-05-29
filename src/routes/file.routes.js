// file.routes.js
// 1. Frontend/Postman sends file to this route
// 2. Auth middleware should verify logged-in user
// 3. Multer middleware reads uploaded file
// 4. Controller uploads file to Cloudinary
// 5. Controller saves file details in MongoDB
// 6. Controller sends response
//
// Note: this route is a draft right now. It needs imports and verifyJWT before use.

// router.post(
//   "/upload",
//   verifyJWT,
//   upload.single("file"),
//   uploadFile
// );
