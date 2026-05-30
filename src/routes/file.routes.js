// file.routes.js
// 1. Frontend/Postman sends file to this route
// 2. Auth middleware should verify logged-in user
// 3. Multer middleware reads uploaded file
// 4. Controller uploads file to Cloudinary
// 5. Controller saves file details in MongoDB
// 6. Controller sends response
//
// Note: this route is a draft right now. It needs imports and verifyJWT before use.

console.log("[file.routes.js] File route draft loaded only if another file imports it.");
console.log("[file.routes.js] No active route runs yet. Next future flow will be route -> auth middleware -> multer -> file.controller.js.");

// router.post(
//   "/upload",
//   verifyJWT,
//   upload.single("file"),
//   uploadFile
// );
