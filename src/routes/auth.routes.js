// auth.routes.js
// 1. Create router
// 2. POST /api/auth/register goes to register controller
// 3. POST /api/auth/login goes to login controller
// 4. Export router to app.js
import express from "express";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/user.controler.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";

console.log("[auth.routes.js] Auth route file loaded because app.js mounted /api/auth.");
console.log("[auth.routes.js] Next step: create router and connect URLs to auth.controler.js functions.");

const router = express.Router();
console.log("[auth.routes.js] Router created. Data going out: route definitions will be attached to this router.");

// Register new user using auth.controler.js.
console.log("[auth.routes.js] Register route added: POST /api/auth/register will execute register() in src/controllers/auth.controler.js.");
router.post("/register", registerUser);

// Login user using auth.controler.js.
console.log("[auth.routes.js] Login route added: POST /api/auth/login will execute login() in src/controllers/auth.controler.js.");
router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get("/current-user", verifyJWT, (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "Current user fetched", req.user));
});

console.log("[auth.routes.js] Auth router ready. Data going out: router is exported to app.js.");
export default router;
