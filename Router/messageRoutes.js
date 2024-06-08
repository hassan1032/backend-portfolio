import express from "express"
import { Deletemessgae, getAllMessages, sendMessage } from "../Controller/message.controller.js"
import {isAuthenticated} from "../middlewares/auth.js"
const router = express.Router()

router.post("/send",sendMessage)
router.get("/get-message",getAllMessages)
router.delete("/delete/:id",isAuthenticated,Deletemessgae)

export default router;