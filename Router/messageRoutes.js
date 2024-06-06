import express from "express"
import { Deletemessgae, getAllMessages, sendMessage } from "../Controller/message.controller.js"

const router = express.Router()

router.post("/send",sendMessage)
router.get("/get-message",getAllMessages)
router.delete("/delete/:id",Deletemessgae)

export default router;