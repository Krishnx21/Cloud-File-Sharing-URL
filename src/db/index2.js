// db/index2.js
// 1. Import mongoose
// 2. Create connectDB function
// 3. Try local MongoDB if USE_LOCAL_DB=true
// 4. Try main MongoDB URI from .env
// 5. Try local URI as fallback
// 6. Print success or warning message
import mongoose from "mongoose";

const connectDB = async () => {
    // Small helper function so we can try more than one MongoDB URL.
    const tryConnect = async (uri, label) => {
        try {
            // mongoose.connect connects Node.js backend to MongoDB.
            await mongoose.connect(uri);
            console.log(`${label} MongoDB connected successfully`);
            return true;
        } catch (err) {
            // If this URL fails, return false so next URL can be tried.
            console.error(`${label} MongoDB connection error:`, err);
            return false;
        }
    };

    // If USE_LOCAL_DB=true, use local database first.
    const useLocal = process.env.USE_LOCAL_DB === "true";
    if (useLocal && process.env.MONGO_URI_LOCAL) {
        const ok = await tryConnect(process.env.MONGO_URI_LOCAL, "Local");
        if (ok) return;
    }

    // Try main database URL from .env.
    if (process.env.MONGO_URI) {
        const ok = await tryConnect(process.env.MONGO_URI, "Primary");
        if (ok) return;
    }

    // If main database did not work, try local database URL.
    if (process.env.MONGO_URI_LOCAL) {
        const ok = await tryConnect(process.env.MONGO_URI_LOCAL, "Local");
        if (ok) return;
    }

    // This warning means no database connection worked.
    console.warn("Could not connect to any MongoDB instance. Continuing without DB connection.");
};

export default connectDB;
