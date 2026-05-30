// auth.routes.js
// 1. Create router
// 2. POST /api/auth/register goes to register controller
// 3. POST /api/auth/login goes to login controller
// 4. Export router to app.js
import express from "express";
import { register, login } from "../controllers/auth.controler.js";

console.log("[auth.routes.js] Auth route file loaded because app.js mounted /api/auth.");
console.log("[auth.routes.js] Next step: create router and connect URLs to auth.controler.js functions.");

const router = express.Router();
console.log("[auth.routes.js] Router created. Data going out: route definitions will be attached to this router.");

// Register new user using auth.controler.js.
console.log("[auth.routes.js] Register route added: POST /api/auth/register will execute register() in src/controllers/auth.controler.js.");
router.post("/register", register);

// Login user using auth.controler.js.
console.log("[auth.routes.js] Login route added: POST /api/auth/login will execute login() in src/controllers/auth.controler.js.");
router.post("/login", login);

console.log("[auth.routes.js] Auth router ready. Data going out: router is exported to app.js.");
export default router;
