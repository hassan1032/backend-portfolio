import express from "express";
import {
  createApplication,
  getApplication,
  deleteApplication,
} from "../Controller/Application.controller.js";

import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/get-all", getApplication);
router.post("/applications", isAuthenticated, createApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
export default router;
