// user.routes.js
// 1. Import express router
// 2. Import controller functions
// 3. Connect API URLs with controller functions
// 4. Export router so app.js can use it
import express from "express";

import { getCurrentUser, loginUser, registerUser } from "../controllers/user.controler.js";

const router = express.Router();

// POST /api/register -> run registerUser controller.
router.route("/register").post(registerUser);

// POST /api/login -> run loginUser controller.
router.route("/login").post(loginUser);

// GET /api/profile -> run getCurrentUser controller.
// Later you can add auth middleware before getCurrentUser.
router.route("/profile").get(getCurrentUser);

export default router;
