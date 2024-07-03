import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./Router/messageRoutes.js";
import userRouter from "./Router/userRouter.js"
import timeLinerouter from "./Router/timelineRoutes.js"
import Applicationrouter from "./Router/software.ApplicationRoutes.js"
import Skillrouter from "./Router/skillsRoutes.js"
import Projectrouter from "./Router/projectRoute.js"

const app = express();

config({ path: "./config/config.env" });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT",],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    // limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/messages", messageRouter);
app.use("/api/user",userRouter)
app.use("/api/timeline",timeLinerouter)
app.use("/api/application",Applicationrouter)
app.use("/api/siklls",Skillrouter)
app.use("/api/project",Projectrouter)
app.use(errorMiddleware);


export default app;
