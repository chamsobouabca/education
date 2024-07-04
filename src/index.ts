import express, { Request, Response } from "express";

import connectToDataBase from "./db/db";

import dotenv from "dotenv";
import userRouter from "./routes/auth.route";
import adminRouter from "./routes/admin.rout";
import teacherRouter from "./routes/teacher.route";
import studentRouter from "./routes/student.route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
connectToDataBase();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://127.0.0.1:5500", // adjust as necessary
  credentials: true,
};
app.use(cors(corsOptions));
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.listen(3000, () => console.log("server work on port 3000"));
