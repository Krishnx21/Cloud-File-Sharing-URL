// user.controler.js
// This file contains the main logic for user register, login, and profile.
import jwt from "jsonwebtoken";
import { User } from "../modules/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

console.log("[user.controler.js] User controller file loaded because user.routes.js imported controller functions.");
console.log("[user.controler.js] Controllers are wrapped with asyncHandler(), so errors go next to Express error handling.");

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
  console.log("[user.controler.js/registerUser] Route hit: POST /api/register reached registerUser controller.");
  console.log("[user.controler.js/registerUser] req.body received from frontend/Postman:", req.body);
  console.log("[user.controler.js/registerUser] Next step: extract username, email, and password from req.body.");
  // Get username, email, password from frontend request body.
  const { username, email, password } = req.body || {};
  console.log("[user.controler.js/registerUser] Data extracted. Going into validation:", { username, email, password });

  // If any field is missing or empty, stop here.
  console.log("[user.controler.js/registerUser] Validation starting: checking if username, email, or password is empty.");
  if ([username, email, password].some((field) => !field?.trim())) {
    console.log("[user.controler.js/registerUser] Validation failed. Error going out to asyncHandler/Express:", "All fields are required");
    throw new ApiError(400, "All fields are required");
  }
  console.log("[user.controler.js/registerUser] Validation passed. Next step: check MongoDB for an existing user.");

  // Check if email already exists, because one email should make only one account.
  console.log("[user.controler.js/registerUser] Database query starting: User.findOne() checks email:", email.toLowerCase());
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  console.log("[user.controler.js/registerUser] Database query completed. existingUser from database:", existingUser);
  if (existingUser) {
    console.log("[user.controler.js/registerUser] User already found. Error going out to asyncHandler/Express:", "User already exists");
    throw new ApiError(409, "User already exists");
  }
  console.log("[user.controler.js/registerUser] No existing user found. Next step: create user in MongoDB.");

  // Create user in MongoDB. Password is hashed inside user.model.js before saving.
  console.log("[user.controler.js/registerUser] Database create starting: User.create() will call user.model.js pre-save password hashing.");
  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password
  });
  console.log("[user.controler.js/registerUser] Database create completed. user from database:", user);
  console.log("[user.controler.js/registerUser] Next step: build ApiResponse without sending password back.");

  // Send success response without password.
  console.log("[user.controler.js/registerUser] Response being sent with status 201. Data going out:", {
    id: user._id,
    username: user.username,
    email: user.email
  });
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
  console.log("[user.controler.js/loginUser] Route hit: POST /api/login reached loginUser controller.");
  console.log("[user.controler.js/loginUser] req.body received from frontend/Postman:", req.body);
  console.log("[user.controler.js/loginUser] Next step: extract email and password from req.body.");
  // Get login details from frontend.
  const { email, password } = req.body || {};
  console.log("[user.controler.js/loginUser] Login data extracted. Going into validation:", { email, password });

  // Email and password are required for login.
  console.log("[user.controler.js/loginUser] Validation starting: checking if email or password is empty.");
  if ([email, password].some((field) => !field?.trim())) {
    console.log("[user.controler.js/loginUser] Validation failed. Error going out to asyncHandler/Express:", "Email and password are required");
    throw new ApiError(400, "Email and password are required");
  }
  console.log("[user.controler.js/loginUser] Validation passed. Next step: find user in MongoDB.");

  // Find user in MongoDB by email.
  console.log("[user.controler.js/loginUser] Database query starting: User.findOne() checks email:", email.toLowerCase());
  const user = await User.findOne({ email: email.toLowerCase() });
  console.log("[user.controler.js/loginUser] Database query completed. user from database:", user);
  if (!user) {
    console.log("[user.controler.js/loginUser] User not found. Error going out to asyncHandler/Express:", "Invalid credentials");
    throw new ApiError(401, "Invalid credentials");
  }
  console.log("[user.controler.js/loginUser] User found. Next step: compare password using user.model.js method isPasswordCorrect().");

  // Compare plain password with encrypted password stored in database.
  console.log("[user.controler.js/loginUser] Password comparison starting. Incoming plain password will be compared with stored hash.");
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("[user.controler.js/loginUser] Password comparison completed. Result going out:", isPasswordValid);
  if (!isPasswordValid) {
    console.log("[user.controler.js/loginUser] Password did not match. Error going out to asyncHandler/Express:", "Invalid credentials");
    throw new ApiError(401, "Invalid credentials");
  }
  console.log("[user.controler.js/loginUser] Password is valid. Next step: generate JWT token.");

  // Create login token. Frontend can use this token for protected routes.
  console.log("[user.controler.js/loginUser] JWT generation started. Data going into token payload:", { id: user._id });
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );
  console.log("[user.controler.js/loginUser] JWT generation completed. Token going out to response:", token);
  console.log("[user.controler.js/loginUser] Next step: build ApiResponse with token and safe user details.");

  // Send token and user details back to frontend.
  console.log("[user.controler.js/loginUser] Response being sent with status 200. Data going out:", {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
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
  console.log("[user.controler.js/getCurrentUser] Route hit: GET /api/profile reached getCurrentUser controller.");
  console.log("[user.controler.js/getCurrentUser] req.user received from previous middleware:", req.user);
  console.log("[user.controler.js/getCurrentUser] Next step: send req.user if present, otherwise send null.");
  console.log("[user.controler.js/getCurrentUser] Response being sent with current user data:", req.user || null);
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
