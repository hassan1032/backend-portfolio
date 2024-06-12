import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
    addNewProject,
  deleteProject,
  updateProject,
  getAllProject,
  getSingleProject,
} from "../Controller/Project.controller.js";
const router = express.Router();
router.post("/addProject", isAuthenticated, addNewProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.get("/getAllProject", isAuthenticated, getAllProject);
router.get("/getSingleProject/:id", isAuthenticated, getSingleProject);

export default router;
