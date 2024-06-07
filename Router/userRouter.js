import express from "express"
import { login, register } from "../Controller/userController.js";

const router = express.Router()

router.post("/create",register)
router.post("/login",login)


export default router;