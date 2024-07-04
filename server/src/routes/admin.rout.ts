import { Router } from "express";
import { checkAdminLimit, protectedRoute, verifyAdmin } from "../middleware/protectedRoute";
import { Request, Response } from "express";
import {
  addTeacher,
  countStudents,
  countTasks,
  createLevel,
  createSubject,
  deleteLevel,
  deleteSubject,
  deleteTeacher,
  getAllLevelSubjects,
  getAllLevels,
  getAllStudents,
  getAllSubjects,
  getAllTasks,
  getAllTeachers,
  getLevel,
  getLevelTeachers,
  getSubject,
  getSubjectTeachers,
  getTeacher,
  updateLevel,
  updateSubject,
  updateTeacher,
} from "../controller/admin.controller";
const router = Router();
router.post("/addTeacher", protectedRoute, verifyAdmin,checkAdminLimit, addTeacher);
router.get("/getAllTeachers", protectedRoute, verifyAdmin, getAllTeachers);
router.get("/getTeacher/:teacherId", protectedRoute, verifyAdmin, getTeacher);
router.delete(
  "/deleteTeacher/:teacherId",
  protectedRoute,
  verifyAdmin,
  deleteTeacher
);
router.get(
  "/getLevelTeachers/:levelId",
  protectedRoute,
  verifyAdmin,
  getLevelTeachers
);
router.get(
  "/getSubjectTeachers/:subjectId",
  protectedRoute,
  verifyAdmin,
  getSubjectTeachers
);
router.put(
  "/updateTeacher/:teacherId",
  protectedRoute,
  verifyAdmin,
  updateTeacher
);

//////////////////level section ////////////////////////
router.post("/createLevel", protectedRoute, verifyAdmin, createLevel);
router.get("/getAllLevels", protectedRoute, verifyAdmin, getAllLevels);
router.get("/getLevel/:levelId", protectedRoute, verifyAdmin, getLevel);
router.delete(
  "/deleteLevel/:levelId",
  protectedRoute,
  verifyAdmin,
  deleteLevel
);
router.put("/updateLevel/:levelId", protectedRoute, verifyAdmin, updateLevel);
//////////////////subject section ////////////////////////
router.post("/createSubject", protectedRoute, verifyAdmin, createSubject);
router.get("/getAllSubjects", protectedRoute, verifyAdmin, getAllSubjects);
router.get("/getSubject/:subjectId", protectedRoute, verifyAdmin, getSubject);
router.post(
  "/getAllLevelSubjects",
  protectedRoute,
  verifyAdmin,
  getAllLevelSubjects
);
router.delete(
  "/deleteSubject/:subjectId",
  protectedRoute,
  verifyAdmin,
  deleteSubject
);
router.put(
  "/updateSubject/:subjectId",
  protectedRoute,
  verifyAdmin,
  updateSubject
);
/////////////////////////task student section /////////////////////
router.get("/getAllStudents", protectedRoute, verifyAdmin, getAllStudents);
router.get("/getAllTasks", protectedRoute, verifyAdmin, getAllTasks);
//////////////////statistics //////////////////////////////
router.get("/countStudents", protectedRoute, verifyAdmin, countStudents);
router.get("/countTasks", protectedRoute, verifyAdmin, countTasks);
export default router;
