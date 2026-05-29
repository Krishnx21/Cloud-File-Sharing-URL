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

// Read values like PORT, MONGO_URI, JWT_SECRET from .env file.
dotenv.config({
    path: "./.env"
});

// Connect database, then start listening for requests.
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        // If something goes wrong while connecting DB, show error.
        console.log("MONGO db connection failed !!! ", err);
    });
