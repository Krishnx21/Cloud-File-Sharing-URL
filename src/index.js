// index.js
// 1. Load environment variables from .env
// 2. Import database connection function
// 3. Import Express app from app.js
// 4. Connect MongoDB first
// 5. Start server only after DB connection code finishes
// 6. If DB connection fails, show the error in terminal
import dotenv from "dotenv";
import connectDB from "./db/index2.js";
import app from "./app.js";

console.log("[index.js] Backend entry file is running because package.json starts src/index.js.");
console.log("[index.js] Next step: load .env values, then call connectDB() from src/db/index2.js.");

// Read values like PORT, MONGO_URI, JWT_SECRET from .env file.
dotenv.config({
    path: "./.env"
});
console.log("[index.js] .env loading completed. Incoming config includes PORT:", process.env.PORT || 8000);
console.log("[index.js] Database connection is starting now. Next file/function: connectDB() in src/db/index2.js.");

// Connect database, then start listening for requests.
connectDB()
    .then(() => {
        console.log("[index.js] Database connection flow finished. Now Express app from src/app.js will start listening.");
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`);
            console.log("[index.js] Server is ready. Next execution happens when frontend/Postman sends a request to app.js routes.");
        });
    })
    .catch((err) => {
        // If something goes wrong while connecting DB, show error.
        console.log("[index.js] Error caught while starting database/server. Data coming in is the error object:", err);
        console.log("MONGO db connection failed !!! ", err);
        console.log("[index.js] Server will not start because MongoDB connection is required.");
        process.exit(1);
    });
