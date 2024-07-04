import { Router } from "express";
import {
  protectedRoute,
  verifyAdmin,
  verifyStudent,
} from "../middleware/protectedRoute";
import { Request, Response } from "express";
import { getStudentTask } from "../controller/student.controller";
const router = Router();
router.get("/getStudentTask", protectedRoute, verifyStudent, getStudentTask);
export default router;
