// user.controler.js
// This file contains the main logic for user register, login, and profile.
import jwt from "jsonwebtoken";
import { User } from "../modules/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// registerUser flow
// 1. Get data from frontend (req.body)
// 2. Validate fields
//    - empty?
//    - valid email?
//    - password length?
// 3. Check if user already exists
//    - email
//    - username
// 4. Save password in model, model hashes it
// 5. Create user in database
// 6. Create clean user object for response
// 7. Do not send password back to frontend
// 8. Check if user created successfully
// 9. Send response
const registerUser = asyncHandler(async (req, res) => {
  // Get username, email, password from frontend request body.
  const { username, email, password } = req.body;

  // If any field is missing or empty, stop here.
  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if email already exists, because one email should make only one account.
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create user in MongoDB. Password is hashed inside user.model.js before saving.
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password
  });

  // Send success response without password.
  return res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      id: user._id,
      username: user.username,
      email: user.email
    })
  );
});

// loginUser flow
// 1. Get email and password from frontend
// 2. Validate empty fields
// 3. Find user by email
// 4. Compare entered password with hashed password
// 5. Create JWT token
// 6. Send token and basic user data
const loginUser = asyncHandler(async (req, res) => {
  // Get login details from frontend.
  const { email, password } = req.body;

  // Email and password are required for login.
  if ([email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user in MongoDB by email.
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Compare plain password with encrypted password stored in database.
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Create login token. Frontend can use this token for protected routes.
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );

  // Send token and user details back to frontend.
  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  );
});

// getCurrentUser flow
// 1. Protected middleware should add logged-in user to req.user
// 2. Send req.user back to frontend
// 3. If no middleware is used, it returns null
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched", req.user || null));
});

// Old name kept so older imports do not break.
const userController = registerUser;

export {
  userController,
  registerUser,
  loginUser,
  getCurrentUser
};
