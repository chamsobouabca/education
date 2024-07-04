import Admin from "../models/admin.model";

import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { Request, Response } from "express";
import Level from "../models/level.model";
import Subject from "../models/subject.model";
import Task from "../models/task.model";
export const addTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fullName, email, password, levelId, subjectId, state } = req.body;
  if (!req.user) {
    return res.status(503);
  }
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(403).json("admin not found");
    }
    const existTeacher = await Teacher.findOne({ email: email });
    if (existTeacher) {
      return res.status(400).json("teacher already exist");
    }
    const existLevel = await Level.findOne({ _id: levelId });
    if (!existLevel) {
      return res.status(400).json("level not exist");
    }
    const existSubject = await Subject.findOne({ _id: subjectId });
    if (!existSubject) {
      return res.status(400).json("subject not exist");
    }
    const teacher = new Teacher({
      fullName: fullName,
      email: email,
      password: password,
      levelId: levelId,
      state: state,
      subjectId: subjectId,
      adminId: req.user.id,
      offerNumber: admin.offerNumber,
    });
    await teacher.save();
    if (!teacher) {
      return res.status(400).json("error when we save teacher");
    }

    return res.status(201).json(teacher);
  } catch (error) {
    console.log("error");
    return res.status(500).json("error from the server");
  }
};
export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const teachers = await Teacher.find({ adminId: req.user.id });
    if (!teachers) {
      return res.status(400).json("error when we get all teachers");
    }
    return res.status(201).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findOne({
      _id: teacherId,
      adminId: req.user.id,
    });
    if (!teacher) {
      return res.status(400).json("teacher note found");
    }
    return res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const deleteTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findOneAndDelete({
      _id: teacherId,
      adminId: req.user.id,
    });

    return res.status(201).json("teacher deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getLevelTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { levelId } = req.params;
  try {
    const existLevel = await Level.findOne({
      _id: levelId,
      adminId: req.user.id,
    });
    if (!existLevel) {
      return res.status(400).json("level not found");
    }
    const teachers = await Teacher.find({ levelId: levelId });
    if (!teachers) {
      return res.status(400).json("no teachers found");
    }
    return res.status(201).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getSubjectTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { subjectId } = req.params;
  try {
    const existSubject = await Subject.findOne({
      _id: subjectId,
      adminId: req.user.id,
    });
    if (!existSubject) {
      return res.status(400).json("subject not found");
    }
    const teachers = await Teacher.find({ subjectId: subjectId });
    if (!teachers) {
      return res.status(400).json("no teachers found");
    }
    return res.status(201).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};

export const updateTeacher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }

  const { teacherId } = req.params;
  const { fullName, email, password, levelId, subjectId, state } = req.body;
  try {
    const teacher = await Teacher.findOne({
      _id: teacherId,
      adminId: req.user.id,
    });
    if (!teacher) {
      return res.status(400).json("teacher not found");
    }
    const existLevel = await Level.findOne({ _id: levelId });
    if (!existLevel && levelId) {
      return res.status(400).json("level not exist");
    }
    const existSubject = await Subject.findOne({ _id: subjectId });
    if (!existSubject && subjectId) {
      return res.status(400).json("subject not exist");
    }
    teacher.fullName = fullName || teacher.fullName;
    teacher.email = email || teacher.email;
    teacher.password = password || teacher.password;
    teacher.state = state || teacher.state;
    teacher.subjectId = subjectId || teacher.subjectId;
    teacher.levelId = levelId || teacher.levelId;
    await teacher.save();
    if (!teacher) {
      return res.status(400).json("error when we save the teacher");
    }
    return res.status(201).json(teacher);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
/////////////level section ///////////////////////
export const createLevel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { name } = req.body;
  try {
    const level = new Level({ name: name, adminId: req.user.id });
    await level.save();
    if (!level) {
      return res.status(400).json("error when we create level");
    }
    return res.status(201).json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getAllLevels = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }

  try {
    const levels = await Level.find({ adminId: req.user.id });
    if (!levels) {
      return res.status(400).json("levels not found");
    }
    return res.status(201).json(levels);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getLevel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { levelId } = req.params;
  try {
    const level = await Level.findOne({ _id: levelId, adminId: req.user.id });
    if (!level) {
      return res.status(400).json("level not found");
    }
    return res.status(201).json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const deleteLevel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { levelId } = req.params;
  try {
    const level = await Level.findOneAndDelete({
      _id: levelId,
      adminId: req.user.id,
    });
    return res.status(200).json("level deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const updateLevel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { levelId } = req.params;
  const { name } = req.body;
  try {
    const level = await Level.findOne({ _id: levelId, adminId: req.user.id });
    if (!level) {
      return res.status(400).json("level not found");
    }
    level.name = name;
    await level.save();
    return res.status(200).json(level);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
/////////////////////////subject section ////////////////////////////////////
export const createSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { name, levelId } = req.body;
  try {
    const level = await Level.findOne({ _id: levelId });
    if (!level) {
      return res.status(400).json("level not found");
    }
    const subject = new Subject({
      name: name,
      adminId: req.user.id,
      levelId: levelId,
    });
    await subject.save();
    if (!subject) {
      return res.status(400).json("error when we create subject");
    }
    return res.status(201).json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getAllSubjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }

  try {
    const subjects = await Subject.find({ adminId: req.user.id });
    if (!subjects) {
      return res.status(400).json("subjects not found");
    }
    return res.status(201).json(subjects);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { subjectId } = req.params;
  try {
    const subject = await Subject.findOne({
      _id: subjectId,
      adminId: req.user.id,
    });
    if (!subject) {
      return res.status(400).json("Subject not found");
    }
    return res.status(201).json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getAllLevelSubjects = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }

  const { levelId } = req.body;
  try {
    const subject = await Subject.find({
      levelId: levelId,
      adminId: req.user.id,
    });
    if (!subject) {
      return res.status(400).json("Subject not found");
    }
    return res.status(201).json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const deleteSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { subjectId } = req.params;
  try {
    const subject = await Subject.findOneAndDelete({
      _id: subjectId,
      adminId: req.user.id,
    });
    return res.status(200).json("subject deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const updateSubject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { subjectId } = req.params;
  const { name } = req.body;
  try {
    const subject = await Subject.findOne({
      _id: subjectId,
      adminId: req.user.id,
    });
    if (!subject) {
      return res.status(400).json("subject not found");
    }
    subject.name = name;
    await subject.save();
    return res.status(200).json(subject);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
/////////////// task Student section //////////////////
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const tasks = await Task.find({ adminId: req.user.id });
    if (!tasks) {
      return res.status(400).json("tasks not found");
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error frm the server");
  }
};
export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const student = await Student.find({ adminId: req.user.id });
    if (!student) {
      return res.status(400).json("students not found");
    }
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error frm the server");
  }
};
////////////////////////////////statistics section ///////////////////

export const countStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const studentCount = await Student.countDocuments({ adminId: req.user.id });
    if (!studentCount) {
      return res.status(400).json("students not found");
    }
    return res.status(200).json(studentCount);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error frm the server");
  }
};
export const countTasks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const tasks = await Task.countDocuments({ adminId: req.user.id });
    if (!tasks) {
      return res.status(400).json("tasks not found");
    }
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error frm the server");
  }
};
export const countTeachers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const teachers = await Teacher.countDocuments({ adminId: req.user.id });
    if (!teachers) {
      return res.status(400).json("error when we get all teachers");
    }
    return res.status(201).json(teachers);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
