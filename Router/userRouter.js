import express from "express";
import { login, register, logout } from "../Controller/userController.js";
import  {isAuthenticated }from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
    
export default router;
