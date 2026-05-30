// user.model.js
// 1. Create user schema
// 2. Define which fields a user document has
// 3. Make email unique so same email cannot register twice
// 4. Hash password before saving user
// 5. Add method to check password during login
// 6. Export User model so controllers can use MongoDB
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

console.log("[user.model.js] User model file loaded because a controller imported User.");
console.log("[user.model.js] Next step: define schema fields, password hook, password method, and export mongoose model.");

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
console.log("[user.model.js] User schema created. Data going out: schema will receive a pre-save hook and login password method.");

// This runs automatically before saving a user.
userSchema.pre("save", async function () {
  console.log("[user.model.js/pre-save] Pre-save hook running because User.create() or user.save() is saving a user.");
  console.log("[user.model.js/pre-save] Incoming user document before save:", this);
  console.log("[user.model.js/pre-save] Next step: check whether password was modified.");
  // If password is not changed, do not hash again.
  if (!this.isModified("password")) {
    console.log("[user.model.js/pre-save] Password was not modified. Data going out: Mongoose continues save without hashing.");
    return;
  }

  // Convert plain password into hashed password.
  console.log("[user.model.js/pre-save] Password hashing started before MongoDB save.");
  this.password = await bcrypt.hash(this.password, 10);
  console.log("[user.model.js/pre-save] Password hashing completed. Data going out to MongoDB is hashed password:", this.password);
  console.log("[user.model.js/pre-save] Hook finished. Mongoose will now continue saving the user.");
});

// This method checks login password.
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("[user.model.js/isPasswordCorrect] Password check method entered from loginUser controller.");
  console.log("[user.model.js/isPasswordCorrect] Incoming password length:", password?.length);
  console.log("[user.model.js/isPasswordCorrect] Stored hashed password from database:", this.password);
  console.log("[user.model.js/isPasswordCorrect] Next function: bcrypt.compare() will return true or false.");
  // bcrypt.compare returns true if password matches the hashed password.
  const result = await bcrypt.compare(password, this.password);
  console.log("[user.model.js/isPasswordCorrect] Password comparison completed. Data going out to controller:", result);
  return result;
};

// User model gives us methods like User.create and User.findOne.
console.log("[user.model.js] User model is being created. Data going out: User export gives controllers User.create() and User.findOne().");
export const User = mongoose.model("User", userSchema);
