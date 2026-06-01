// file.controller.js
// 1. Get uploaded file from req.file
// 2. Validate file exists
// 3. Upload file to Cloudinary
// 4. Save Cloudinary details in MongoDB
// 5. Send response to frontend/Postman
import fs from "fs";
import { File } from "../modules/file.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";

console.log("[file.controller.js] File controller loaded because file.routes.js imported uploadFile/getFileById.");

const removeLocalFile = (localPath) => {
  if (localPath && fs.existsSync(localPath)) {
    fs.unlinkSync(localPath);
  }
};

const uploadFile = asyncHandler(async (req, res) => {
  console.log("[file.controller.js/uploadFile] Route hit: uploadFile controller entered.");
  console.log("[file.controller.js/uploadFile] req.user received from auth middleware:", req.user);
  console.log("[file.controller.js/uploadFile] req.file received from multer middleware:", req.file);
  console.log("[file.controller.js/uploadFile] req.body received with any extra form fields:", req.body);

  if (!req.file?.path) {
    throw new ApiError(400, "File is required");
  }

  const uploadedFile = await uploadOnCloudinary(req.file.path, req.file.mimetype);

  if (!uploadedFile?.url || !uploadedFile?.public_id) {
    throw new ApiError(500, "File upload failed");
  }

  removeLocalFile(req.file.path);

  const expiresInDays = Number(req.body?.expiresInDays || 7);
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const file = await File.create({
    filename: req.file.originalname,
    url: uploadedFile.secure_url || uploadedFile.url,
    publicId: uploadedFile.public_id,
    user: req.user._id,
    size: req.file.size,
    mimetype: req.file.mimetype,
    expiresAt
  });

  const shareableLink = `${req.protocol}://${req.get("host")}/api/files/${file._id}`;

  console.log("[file.controller.js/uploadFile] File saved in MongoDB:", file);

  return res.status(201).json(
    new ApiResponse(201, "File uploaded successfully", {
      id: file._id,
      filename: file.filename,
      url: file.url,
      publicId: file.publicId,
      size: file.size,
      mimetype: file.mimetype,
      expiresAt: file.expiresAt,
      uploadedBy: file.user,
      deleted: file.deleted,
      shareableLink
    })
  );
});

const buildFileResponse = (req, file) => ({
  id: file._id,
  filename: file.filename,
  url: file.url,
  publicId: file.publicId,
  size: file.size,
  mimetype: file.mimetype,
  expiresAt: file.expiresAt,
  createdAt: file.createdAt,
  updatedAt: file.updatedAt,
  uploadedBy: file.user,
  shareableLink: `${req.protocol}://${req.get("host")}/api/files/${file._id}`
});

const getUserFiles = asyncHandler(async (req, res) => {
  console.log("[file.controller.js/getUserFiles] Route hit: get all files for logged-in user.");

  const files = await File.find({ user: req.user._id }).sort({ createdAt: -1 });
  const formattedFiles = files.map((file) => buildFileResponse(req, file));

  return res
    .status(200)
    .json(new ApiResponse(200, "Files fetched successfully", formattedFiles));
});

const getFileById = asyncHandler(async (req, res) => {
  console.log("[file.controller.js/getFileById] Route hit: getFileById controller entered.");
  console.log("[file.controller.js/getFileById] req.params received from URL:", req.params);

  const file = await File.findById(req.params.id);

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  if (file.expiresAt && file.expiresAt < new Date()) {
    throw new ApiError(410, "File link has expired");
  }

  return res.redirect(file.url);
});

export { uploadFile, getUserFiles, getFileById };
