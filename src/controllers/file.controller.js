// file.controller.js
// 1. Get uploaded file from req.file
// 2. Validate file exists
// 3. Upload file to Cloudinary
// 4. Save Cloudinary details in MongoDB
// 5. Send response to frontend/Postman
import { v2 as cloudinary } from "cloudinary";
import { File } from "../modules/file.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadBufferOnCloudinary } from "../utils/cloudnary.js";

console.log("[file.controller.js] File controller loaded because file.routes.js imported uploadFile/getFileById.");

const getUploadMode = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(200, "Upload mode fetched", {
      uploadMode: "memoryStorage",
      usesPublicTemp: false,
      usesUnlink: false
    })
  );
});

const uploadFile = asyncHandler(async (req, res) => {
  console.log("[file.controller.js/uploadFile] ACTIVE_UPLOAD_MODE=memoryStorage/no-unlink.");
  console.log("[file.controller.js/uploadFile] Route hit: uploadFile controller entered.");
  console.log("[file.controller.js/uploadFile] req.user received from auth middleware:", req.user);
  console.log("[file.controller.js/uploadFile] req.file received from multer middleware:", req.file);
  console.log("[file.controller.js/uploadFile] req.body received with any extra form fields:", req.body);

  if (!req.file?.buffer) {
    throw new ApiError(400, "File is required");
  }

  const uploadedFile = await uploadBufferOnCloudinary(
    req.file.buffer,
    req.file.mimetype,
    req.file.originalname
  );

  if (!uploadedFile?.url || !uploadedFile?.public_id) {
    throw new ApiError(500, "File upload failed");
  }

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
  downloadCount: file.downloadCount || 0,
  lastAccessedAt: file.lastAccessedAt,
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

  file.downloadCount = (file.downloadCount || 0) + 1;
  file.lastAccessedAt = new Date();
  await file.save();

  return res.redirect(file.url);
});

const deleteFile = asyncHandler(async (req, res) => {
  const file = await File.findOne({
    _id: req.params.id,
    user: req.user._id
  });

  if (!file) {
    throw new ApiError(404, "File not found");
  }

  const resourceType = file.mimetype?.startsWith("image/")
    ? "image"
    : file.mimetype?.startsWith("video/")
      ? "video"
      : "raw";

  await cloudinary.uploader.destroy(file.publicId, { resource_type: resourceType });
  await File.deleteOne({ _id: file._id });

  return res
    .status(200)
    .json(new ApiResponse(200, "File deleted successfully", { id: file._id }));
});

export { getUploadMode, uploadFile, getUserFiles, getFileById, deleteFile };
