import express from "express";

import { registerUser, loginUser } from "../controllers/user.controler.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Protected route example
router.route("/profile").get(verifyJWT, getCurrentUser);

export default router;