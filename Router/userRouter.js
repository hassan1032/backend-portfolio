import express from "express";
import { login, register, logout, getUser } from "../Controller/userController.js";
import  {isAuthenticated }from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me",isAuthenticated,getUser)    
export default router;
