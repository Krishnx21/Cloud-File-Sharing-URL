// auth.routes.js
// 1. Create router
// 2. POST /api/auth/register goes to register controller
// 3. POST /api/auth/login goes to login controller
// 4. Export router to app.js
import express from "express";
import { register, login } from "../controllers/auth.controler.js";

const router = express.Router();

// Register new user using auth.controler.js.
router.post("/register", register);

// Login user using auth.controler.js.
router.post("/login", login);

export default router;
