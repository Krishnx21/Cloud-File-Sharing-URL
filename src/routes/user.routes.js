// user.routes.js
// 1. Import express router
// 2. Import controller functions
// 3. Connect API URLs with controller functions
// 4. Export router so app.js can use it
import express from "express";

import { getCurrentUser, loginUser, registerUser } from "../controllers/user.controler.js";

console.log("[user.routes.js] User route file loaded because app.js mounted /api.");
console.log("[user.routes.js] Next step: create router and connect URLs to user.controler.js functions.");

const router = express.Router();
console.log("[user.routes.js] Router created. Data going out: route definitions will be attached to this router.");

// POST /api/register -> run registerUser controller.
console.log("[user.routes.js] Register route added: POST /api/register will execute registerUser() in src/controllers/user.controler.js.");
router.route("/register").post(registerUser);

// POST /api/login -> run loginUser controller.
console.log("[user.routes.js] Login route added: POST /api/login will execute loginUser() in src/controllers/user.controler.js.");
router.route("/login").post(loginUser);

// GET /api/profile -> run getCurrentUser controller.
// Later you can add auth middleware before getCurrentUser.
console.log("[user.routes.js] Profile route added: GET /api/profile will execute getCurrentUser() in src/controllers/user.controler.js.");
router.route("/profile").get(getCurrentUser);

console.log("[user.routes.js] User router ready. Data going out: router is exported to app.js.");
export default router;
