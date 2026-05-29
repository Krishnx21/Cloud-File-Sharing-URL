// auth.controler.js
// 1. This is another auth controller
// 2. It has register and login functions
// 3. register creates a user
// 4. login checks password and creates JWT token
// 5. user.controler.js is currently the cleaner controller used by /api routes
import { User } from "../modules/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register flow
// 1. Get name, email, password from req.body
// 2. Hash password manually
// 3. Save user in MongoDB
// 4. Send response
export const register = async (req, res) => {
  // Get data from frontend.
  const { name, email, password } = req.body;

  // Convert plain password into hashed password.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user in database.
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  // Send created user response.
  res.json({ message: "User registered", user });
};

// login flow
// 1. Get email and password from req.body
// 2. Find user by email
// 3. Compare password
// 4. Create JWT token
// 5. Send token
export const login = async (req, res) => {
  // Get login data from frontend.
  const { email, password } = req.body;

  // Find user by email.
  const user = await User.findOne({ email });

  // If user does not exist, stop request.
  if (!user) return res.status(404).json({ message: "User not found" });

  // Compare entered password with hashed password in database.
  const isMatch = await bcrypt.compare(password, user.password);

  // If password is wrong, stop request.
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Create token for logged-in user.
  const token = jwt.sign({ id: user._id }, "secretkey");

  // Send login response.
  res.json({ message: "Login successful", token });
};
