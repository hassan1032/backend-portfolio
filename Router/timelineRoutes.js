import express from "express"
import {isAuthenticated} from "../middlewares/auth.js"
import {postTimeline,deleteTimeline,getallTimeline} from "../Controller/timeLine.controlller.js"
const router = express.Router()

router.post("/add", isAuthenticated,postTimeline)
router.get("/getall",getallTimeline)
router.delete("/delete/:id",isAuthenticated,deleteTimeline)

export default router;