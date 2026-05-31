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
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";

console.log("[app.js] Express app setup file loaded because index.js imported app from here.");
console.log("[app.js] Next step: create the Express app, attach middleware, then connect route files.");

// Create one Express application.
const app = express();
console.log("[app.js] Express app created. Data going out: app object will receive middleware and routes next.");

// Allow requests from the frontend URL stored in .env.
console.log("[app.js] Adding CORS middleware so frontend requests can enter this backend. Incoming origin allowed:", process.env.CORS_ORIGIN);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
console.log("[app.js] CORS middleware added. Next middleware: express.json() will read JSON req.body.");

// Allow backend to understand JSON data from req.body.
console.log("[app.js] Adding express.json middleware. It turns incoming JSON into req.body for controllers.");
app.use(express.json({ limit: "10mb" }));
console.log("[app.js] express.json middleware added. Next middleware: express.urlencoded() will read form data.");

// Allow backend to understand form data from req.body.
console.log("[app.js] Adding express.urlencoded middleware. It turns form submissions into req.body.");
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
console.log("[app.js] express.urlencoded middleware added. Next middleware: express.static() will serve public files.");

// Make files inside public folder available directly.
console.log("[app.js] Adding static file middleware. Incoming browser requests for public files can be served from /public.");
app.use(express.static("public"));
console.log("[app.js] Static middleware added. Next middleware: cookieParser() will read cookies.");

// Read cookies from incoming requests.
console.log("[app.js] Adding cookieParser middleware. It makes incoming cookies available as req.cookies.");
app.use(cookieParser());
console.log("[app.js] cookieParser middleware added. Next step: connect /api routes.");

// Send /api/register, /api/login, /api/profile requests to user.routes.js.
console.log("[app.js] Mounting userRoutes. Incoming URLs beginning with /api will go to src/routes/user.routes.js.");
app.use("/api", userRoutes);
console.log("[app.js] userRoutes mounted. Next route group: /api/auth goes to auth.routes.js.");

// Send /api/auth/register and /api/auth/login requests to auth.routes.js.
console.log("[app.js] Mounting authRoutes. Incoming URLs beginning with /api/auth will go to src/routes/auth.routes.js.");
app.use("/api/auth", authRoutes);
console.log("[app.js] authRoutes mounted. Next route group: /api/files goes to file.routes.js.");

// Send /api/files/upload requests to file.routes.js.
console.log("[app.js] Mounting fileRoutes. Incoming URLs beginning with /api/files will go to src/routes/file.routes.js.");
app.use("/api/files", fileRoutes);
console.log("[app.js] fileRoutes mounted. Data going out: configured app is exported back to index.js.");

// Send JSON errors instead of Express's default HTML error page.
app.use((err, req, res, next) => {
    console.log("[app.js/errorHandler] Error middleware entered because a controller or middleware threw an error.");
    console.log("[app.js/errorHandler] Incoming error:", err);
    console.log("[app.js/errorHandler] Response being sent as JSON so Postman can read it clearly.");

    return res.status(err.statusCode || 500).json({
        success: false,
        statusCode: err.statusCode || 500,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });
});

export default app;
