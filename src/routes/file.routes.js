// file.routes.js
// 1. Frontend/Postman sends file to this route
// 2. Auth middleware verifies logged-in user
// 3. Multer middleware reads uploaded file
// 4. Controller uploads file to Cloudinary and saves details
import express from "express";
import { deleteFile, getFileById, getUploadMode, getUserFiles, uploadFile } from "../controllers/file.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

console.log("[file.routes.js] File route file loaded because app.js mounted /api/files.");
console.log("[file.routes.js] Next step: create router and connect protected upload route.");

const router = express.Router();

console.log("[file.routes.js] Upload route added: POST /api/files/upload will run verifyJWT -> upload.single('file') -> uploadFile.");
router.post("/upload", verifyJWT, upload.single("file"), uploadFile);

console.log("[file.routes.js] Upload mode route added: GET /api/files/upload-mode shows active upload implementation.");
router.get("/upload-mode", getUploadMode);

console.log("[file.routes.js] History route added: GET /api/files will return logged-in user's files.");
router.get("/", verifyJWT, getUserFiles);

console.log("[file.routes.js] Share route added: GET /api/files/:id will redirect to the Cloudinary file URL if not expired.");
router.get("/:id", getFileById);

router.delete("/:id", verifyJWT, deleteFile);

console.log("[file.routes.js] File router ready. Data going out: router is exported to app.js.");
export default router;
