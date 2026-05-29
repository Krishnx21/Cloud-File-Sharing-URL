// user.model.js
// 1. Create user schema
// 2. Define which fields a user document has
// 3. Make email unique so same email cannot register twice
// 4. Hash password before saving user
// 5. Add method to check password during login
// 6. Export User model so controllers can use MongoDB
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // User's display/login name.
    username: {
      type: String,
      required: true
    },
    // User email. unique means MongoDB should not allow duplicate email.
    email: {
      type: String,
      required: true,
      unique: true
    },
    // Password is stored hashed, not plain text.
    password: {
      type: String,
      required: true
    },
    // Cloudinary file URL can be saved here later.
    fileUrl: {
      type: String
    },
    // Cloudinary public id can be saved here later.
    fileId: {
      type: String
    },
    // List of file ids connected with this user.
    files: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "File"
    }
  },
  { timestamps: true }
);

// This runs automatically before saving a user.
userSchema.pre("save", async function (next) {
  // If password is not changed, do not hash again.
  if (!this.isModified("password")) return next();

  // Convert plain password into hashed password.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// This method checks login password.
userSchema.methods.isPasswordCorrect = async function (password) {
  // bcrypt.compare returns true if password matches the hashed password.
  return await bcrypt.compare(password, this.password);
};

// User model gives us methods like User.create and User.findOne.
export const User = mongoose.model("User", userSchema);
