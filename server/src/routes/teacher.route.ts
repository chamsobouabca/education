import { Router } from "express";
import {
  checkTeacherLimit,
  protectedRoute,
  verifyAdmin,
  verifyTeacher,
} from "../middleware/protectedRoute";
import { Request, Response } from "express";
import {
  addStudent,
  addTask,
  deleteStudent,
  deleteTask,
  getAllTasks,
  getStudent,
  getTask,
  getTeacherStudents,
  updateStudent,
  updateTask,
} from "../controller/teacher.controller";
const router = Router();
router.post(
  "/addStudent",
  protectedRoute,
  verifyTeacher,
  checkTeacherLimit,
  addStudent
);
router.get(
  "/getTeacherStudents",
  protectedRoute,
  verifyTeacher,
  getTeacherStudents
);
router.get("/getStudent/:studentId", protectedRoute, verifyTeacher, getStudent);
router.delete(
  "/deleteStudent/:studentId",
  protectedRoute,
  verifyTeacher,
  deleteStudent
);
router.put(
  "/updateStudent/:studentId",
  protectedRoute,
  verifyTeacher,
  updateStudent
);
///////////////////////////task section ///////////////////////
router.post("/addTask", protectedRoute, verifyTeacher, addTask);
router.get("/getAllTasks", protectedRoute, verifyTeacher, getAllTasks);
router.get("/getTsk/:taskId", protectedRoute, verifyTeacher, getTask);
router.delete("/deleteTsk/:taskId", protectedRoute, verifyTeacher, deleteTask);
router.put("/updateTask/:taskId", protectedRoute, verifyTeacher, updateTask);
export default router;
