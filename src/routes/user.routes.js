import express from "express";

import { getCurrentUser, loginUser, registerUser } from "../controllers/user.controler.js";

const router = express.Router();

// Public routes
router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Protected route example
router.route("/profile").get(getCurrentUser);

export default router;
