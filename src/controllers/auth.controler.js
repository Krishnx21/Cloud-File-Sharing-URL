// auth.controler.js
// 1. This is another auth controller
// 2. It has register and login functions
// 3. register creates a user
// 4. login checks password and creates JWT token
// 5. user.controler.js is currently the cleaner controller used by /api routes
import { User } from "../modules/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

console.log("[auth.controler.js] Auth controller file loaded because auth.routes.js imported register and login.");
console.log("[auth.controler.js] Data going out: register() and login() functions are exported to auth.routes.js.");

// register flow
// 1. Get username/name, email, password from req.body
// 2. Validate required fields
// 3. Save user in MongoDB
// 4. Password is hashed inside user.model.js before saving
// 5. Send response
export const register = async (req, res) => {
  console.log("[auth.controler.js/register] Route hit: POST /api/auth/register reached the register controller.");
  console.log("[auth.controler.js/register] req.body received from frontend/Postman:", req.body);
  console.log("[auth.controler.js/register] Next step: read username/name, email, and password from req.body.");
  // Get data from frontend.
  const { name, username, email, password } = req.body || {};
  const finalUsername = username || name;
  console.log("[auth.controler.js/register] Data extracted from req.body. Going into validation:", { finalUsername, email, password });

  // username/email/password are required because user.model.js requires them.
  if ([finalUsername, email, password].some((field) => !field?.trim())) {
    console.log("[auth.controler.js/register] Validation failed. Response being sent with 400.");
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Username, email and password are required",
      errors: []
    });
  }

  // Create user in database. Password is hashed inside user.model.js before saving.
  console.log("[auth.controler.js/register] Database query starting: User.create() will save username, email, and password.");
  const user = await User.create({
    username: finalUsername.toLowerCase(),
    email: email.toLowerCase(),
    password
  });
  console.log("[auth.controler.js/register] Database query completed. user from database:", user);
  console.log("[auth.controler.js/register] Next step: send JSON response back to frontend/Postman.");

  // Send created user response.
  console.log("[auth.controler.js/register] Response being sent. Data going out:", { message: "User registered", user });
  res.status(201).json({
    message: "User registered",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  });
};

// login flow
// 1. Get email and password from req.body
// 2. Find user by email
// 3. Compare password
// 4. Create JWT token
// 5. Send token
export const login = async (req, res) => {
  console.log("[auth.controler.js/login] Route hit: POST /api/auth/login reached the login controller.");
  console.log("[auth.controler.js/login] req.body received from frontend/Postman:", req.body);
  console.log("[auth.controler.js/login] Next step: read email and password from req.body.");
  // Get login data from frontend.
  const { email, password } = req.body || {};
  console.log("[auth.controler.js/login] Login data extracted. Database lookup will use email:", email);

  if ([email, password].some((field) => !field?.trim())) {
    console.log("[auth.controler.js/login] Validation failed. Response being sent with 400.");
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Email and password are required",
      errors: []
    });
  }

  // Find user by email.
  console.log("[auth.controler.js/login] Database query starting: User.findOne() will search for this email.");
  const user = await User.findOne({ email: email.toLowerCase() });
  console.log("[auth.controler.js/login] Database query completed. user from database:", user);

  // If user does not exist, stop request.
  if (!user) {
    console.log("[auth.controler.js/login] User not found. Response being sent with 404. Next file/function: Express sends response to frontend/Postman.");
    return res.status(404).json({ message: "User not found" });
  }

  // Compare entered password with hashed password in database.
  console.log("[auth.controler.js/login] Password comparison starting with bcrypt.compare(). Incoming data: plain password and database hashed password.");
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("[auth.controler.js/login] Password comparison completed. Result going out:", isMatch);

  // If password is wrong, stop request.
  if (!isMatch) {
    console.log("[auth.controler.js/login] Password did not match. Response being sent with 400. Next file/function: Express sends response to frontend/Postman.");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create token for logged-in user.
  console.log("[auth.controler.js/login] JWT generation started. Data going into token payload:", { id: user._id });
  const token = jwt.sign({ id: user._id }, "secretkey");
  console.log("[auth.controler.js/login] JWT generation completed. Token going out to response:", token);

  // Send login response.
  console.log("[auth.controler.js/login] Response being sent. Next file/function: Express sends JSON to frontend/Postman.");
  res.json({ message: "Login successful", token });
};
