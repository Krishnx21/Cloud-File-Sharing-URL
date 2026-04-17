//create Creates Express app Adds middleware


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {user.controler} from "./controllers/user.controler.js";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true, limit:"10mb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api", testRoutes);

export default app;