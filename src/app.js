// app.js
// 1. Create the Express app
// 2. Add common middleware
//    - cors: allows frontend to call backend
//    - express.json: reads JSON body from frontend
//    - express.urlencoded: reads form data
//    - express.static: serves public files
//    - cookieParser: reads cookies
// 3. Connect route files
//    - /api goes to user routes
//    - /api/auth goes to auth routes
// 4. Export app so index.js can start the server
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Create one Express application.
const app = express();

// Allow requests from the frontend URL stored in .env.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Allow backend to understand JSON data from req.body.
app.use(express.json({ limit: "10mb" }));

// Allow backend to understand form data from req.body.
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Make files inside public folder available directly.
app.use(express.static("public"));

// Read cookies from incoming requests.
app.use(cookieParser());

// Send /api/register, /api/login, /api/profile requests to user.routes.js.
app.use("/api", userRoutes);

// Send /api/auth/register and /api/auth/login requests to auth.routes.js.
app.use("/api/auth", authRoutes);

export default app;
