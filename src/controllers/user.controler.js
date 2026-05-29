import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
  
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


// 1. Get file from frontend
// 2. Validate file
// 3. Upload to cloud
// 4. Save file URL in DB
// 5. Generate shareable link
// 6. Send response



export const userController = (req, res) => {
  //1 get data from frontend
  const {username,email,password}=req.body
  console.log("user",username);

  //2
  // if (fullname === "") {
  //   throw new ApiError("Full name is required", 400);
  // }
  // if (email === "") {
  //   throw new ApiError("Email is required", 400);
  // }
  // if (password === "") {
  //   throw new ApiError("Password is required", 400);
  // }

  if(
    [username,email,password].some((field) => 
      !field.trim() === "") //
  ){
    throw new ApiError("All fields are required", 400);
  }
  //3 check existing user
  const existingUser = await User.findOne({email});
  if(existingUser){
    throw new ApiError("User already exists", 409);
  }

  //4 hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //5 create user in database
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });
  if(!newUser){
    throw new ApiError("Failed to create user", 500);
  }
  //6 create user object for response
  const userResponse = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email
  };
  
  //7. Send response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: userResponse
  });   
  
  



  




}
  


export {
  userController,
}