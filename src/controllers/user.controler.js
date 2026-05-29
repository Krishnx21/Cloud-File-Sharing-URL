import jwt from "jsonwebtoken";
import { User } from "../modules/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//1. Get data from frontend (req.body)
//2. Validate fields
//    - empty?
//    - valid email?
//    - password length?
// 3.Check if user already exists
//    - email
//    - username
// 4.Hash password
// 5. Create user in database , file URL in DB
// 6. create user object - create entry in DB
// 7  remove password from user object or object 
// 8. Check if user created successfully]
// 9. Send response
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password
  });

  return res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      id: user._id,
      username: user.username,
      email: user.email
    })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1d" }
  );

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

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched", req.user || null));
});

const userController = registerUser;

export {
  userController,
  registerUser,
  loginUser,
  getCurrentUser
};
