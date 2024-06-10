import express from "express";
import { login, register, logout, getUser, updateProfile, updatePassword, getUserPortfolio } from "../Controller/userController.js";
import  {isAuthenticated }from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/me",isAuthenticated,getUser)    
router.put("/update-profile/:id", isAuthenticated, updateProfile);
router.put("/update-password/:id", isAuthenticated, updatePassword);
router.get("/me-get-portfolio",getUserPortfolio)
export default router;
