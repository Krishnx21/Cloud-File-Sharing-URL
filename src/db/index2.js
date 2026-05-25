// Basic MongoDB connection for ES module
//2 connect the backend with the database and then start the server
import mongoose from "mongoose";

const connectDB = async () => {
    const tryConnect = async (uri, label) => {
        try {
            await mongoose.connect(uri);
            console.log(`${label} MongoDB connected successfully`);
            return true;
        } catch (err) {
            console.error(`${label} MongoDB connection error:`, err);
            return false;
        }
    };

    // Prefer explicit local override in development, otherwise try primary then fallback
    const useLocal = process.env.USE_LOCAL_DB === "true";
    if (useLocal && process.env.MONGO_URI_LOCAL) {
        const ok = await tryConnect(process.env.MONGO_URI_LOCAL, "Local");
        if (ok) return;
    }

    if (process.env.MONGO_URI) {
        const ok = await tryConnect(process.env.MONGO_URI, "Primary");
        if (ok) return;
    }

    // fallback: attempt local if available
    if (process.env.MONGO_URI_LOCAL) {
        const ok = await tryConnect(process.env.MONGO_URI_LOCAL, "Local");
        if (ok) return;
    }

    console.warn("Could not connect to any MongoDB instance. Continuing without DB connection.");
};

export default connectDB;
