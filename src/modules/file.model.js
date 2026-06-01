

import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  // File name as uploaded by user.
  filename: {
    type: String,
    required: true
  },
  // URL of the file stored in Cloudinary.
  url: {
    type: String,
    required: true
  },
  // Cloudinary public id for the file, used for deletion.
  publicId: {
    type: String,
    required: true
  },
  // Reference to the user who uploaded the file.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  mimetype: {
    type: String,
    required: true  
  },
  expiresAt: {
    type: Date,
    required: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  lastAccessedAt: {
    type: Date
  },
}, { timestamps: true });

export const File = mongoose.model("File", fileSchema);
