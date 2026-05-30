// db/index2.js
// 1. Import mongoose
// 2. Create connectDB function
// 3. Try MongoDB Atlas first using MONGO_URI
// 4. Use local MongoDB only as an explicit fallback when USE_LOCAL_DB=true
// 5. Stop server startup if no database connection works
// 6. Print clear success/failure messages
import mongoose from "mongoose";

console.log("[db/index2.js] Database file loaded because index.js imported connectDB().");
console.log("[db/index2.js] Data going out: connectDB() will be exported back to index.js.");

const connectDB = async () => {
    console.log("[db/index2.js/connectDB] connectDB entered. It runs before the Express server starts accepting requests.");
    console.log("[db/index2.js/connectDB] Atlas is the primary database. Next step: check MONGO_URI from .env.");

    // This helper hides username/password while still showing which database target is being used.
    const describeUri = (uri) => {
        if (!uri) return "missing URI";

        try {
            const parsedUri = new URL(uri);
            return `${parsedUri.protocol}//${parsedUri.hostname}${parsedUri.pathname}`;
        } catch {
            return "URI exists, but it could not be safely displayed";
        }
    };

    // Small helper function so we can try more than one MongoDB URL.
    const tryConnect = async (uri, label) => {
        console.log(`[db/index2.js/tryConnect] Database query starting for ${label} MongoDB.`);
        console.log("[db/index2.js/tryConnect] Incoming URI exists:", Boolean(uri));
        console.log(`[db/index2.js/tryConnect] URI being used for ${label}:`, describeUri(uri));
        console.log("[db/index2.js/tryConnect] Next function: mongoose.connect() will try to connect Node.js to MongoDB.");
        try {
            // mongoose.connect connects Node.js backend to MongoDB.
            await mongoose.connect(uri);
            console.log(`${label} MongoDB connected successfully`);
            console.log("[db/index2.js/tryConnect] Mongoose connection state:", mongoose.connection.readyState);
            console.log("[db/index2.js/tryConnect] Connected database name:", mongoose.connection.name);
            console.log("[db/index2.js/tryConnect] Connected database host:", mongoose.connection.host);
            console.log(`[db/index2.js/tryConnect] Database query completed for ${label}. Data going out: true to connectDB().`);
            return true;
        } catch (err) {
            // If this URL fails, return false so next URL can be tried.
            console.log(`[db/index2.js/tryConnect] Error caught while connecting ${label}. Data coming in is error:`, err);
            console.error(`${label} MongoDB connection error:`, err);
            console.log(`[db/index2.js/tryConnect] Data going out: false so connectDB() can try the next URI.`);
            return false;
        }
    };

    // Atlas is always the first database choice.
    if (!process.env.MONGO_URI) {
        console.error("[db/index2.js/connectDB] MONGO_URI is missing. Atlas connection cannot start.");
        throw new Error("MONGO_URI is required. Add your MongoDB Atlas connection string to .env.");
    }

    console.log("[db/index2.js/connectDB] Primary database flow selected: MongoDB Atlas from MONGO_URI.");
    const atlasConnected = await tryConnect(process.env.MONGO_URI, "Atlas");
    if (atlasConnected) {
        console.log("[db/index2.js/connectDB] Atlas connection succeeded. Express can start safely now.");
        console.log("[db/index2.js/connectDB] Data going out: connectDB() returns to index.js.");
        return;
    }

    console.error("[db/index2.js/connectDB] Atlas connection failed. Check Atlas username/password, IP access list, cluster status, and database URI.");

    // Local MongoDB is only a fallback when you explicitly allow it.
    const useLocalFallback = process.env.USE_LOCAL_DB === "true";
    console.log("[db/index2.js/connectDB] USE_LOCAL_DB value checked. Incoming value:", process.env.USE_LOCAL_DB);
    console.log("[db/index2.js/connectDB] Should fallback to local database if Atlas failed:", useLocalFallback);
    if (useLocalFallback && process.env.MONGO_URI_LOCAL) {
        console.log("[db/index2.js/connectDB] Fallback logic triggered: trying local MongoDB from MONGO_URI_LOCAL.");
        const localConnected = await tryConnect(process.env.MONGO_URI_LOCAL, "Local fallback");
        if (localConnected) {
            console.log("[db/index2.js/connectDB] Local fallback connected. Warning: app is NOT using Atlas for this run.");
            console.log("[db/index2.js/connectDB] Data going out: connectDB() returns to index.js.");
            return;
        }
    }

    // This error stops the server from listening without a database.
    console.error("[db/index2.js/connectDB] No MongoDB connection succeeded. Server startup will stop now.");
    throw new Error("Database connection failed. Server not started.");
};

export default connectDB;
