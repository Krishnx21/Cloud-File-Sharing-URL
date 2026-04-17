//Defines API endpoints
import express from "express";
import { userController } from "../controllers/user.controler.js";

const router = express.Router();

router.get("/test", userController);

export default router;