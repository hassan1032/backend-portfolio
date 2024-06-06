import express from "express"
import { sendMessage } from "../Controller/message.controller.js"

const router = express.Router()

router.post("/send",sendMessage)

export default router;