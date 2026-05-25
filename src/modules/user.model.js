import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    file: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "File"
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);