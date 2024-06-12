import express from "express"
import {isAuthenticated} from "../middlewares/auth.js"
import {addNewSkill,getAllSkills,updateSkill,deleteSkill} from "../Controller/skills.controller.js"
const router = express.Router()
router.post("/add", isAuthenticated,addNewSkill);
router.get("/all", getAllSkills);
router.put("/update/:id", isAuthenticated, updateSkill);
router.delete("/delete/:id", isAuthenticated, deleteSkill);

export default router;