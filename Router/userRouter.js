import express from "express";
import { login, register, logout, getUser, updateProfile } from "../Controller/userController.js";
import  {isAuthenticated }from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me",isAuthenticated,getUser)    
router.put("/update-profile/:id", isAuthenticated, updateProfile);
export default router;
