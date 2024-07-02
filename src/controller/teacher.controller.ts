import Admin from "../models/admin.model";

import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { Request, Response } from "express";
import Level from "../models/level.model";
import Subject from "../models/subject.model";
import Task from "../models/task.model";
export const addStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  console.log("hello");
  const { fullName, email, password, levelId, state } = req.body;
  try {
    const teacher = await Teacher.findById(req.user.id);
    const existStudent = await Student.findOne({ email: email });
    if (existStudent) {
      return res.status(400).json("student already exist");
    }

    const existLevel = await Level.findOne({ _id: levelId });
    if (!existLevel) {
      return res.status(400).json("level not found");
    }
    const student = new Student({
      fullName: fullName,
      email: email,
      password: password,
      levelId: levelId,
      state: state,
      adminId: teacher?.adminId,
      teacherId: req.user.id,
    });
    await student.save();
    if (!student) {
      return res.status(400).json("error when we save the student ");
    }
    return res.status(201).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getTeacherStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const students = await Student.find({ teacherId: req.user.id });
    if (!students) {
      return res.status(400).json("students not found");
    }
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { studentId } = req.params;
  try {
    const student = await Student.find({ _id: studentId });
    if (!student) {
      return res.status(400).json("students not found");
    }
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const deleteStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { studentId } = req.params;
  try {
    const student = await Student.findOneAndDelete({ _id: studentId });

    return res.status(200).json("student deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const updateStudent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { studentId } = req.params;
  const { fullName, email, password, state, levelId } = req.body;
  try {
    const level = await Level.findOne({ _id: levelId });
    if (levelId && !level) {
      return res.status(400).json("level not found");
    }
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      return res.status(400).json("student not found");
    }
    student.fullName = fullName || student.fullName;
    student.email = email || student.email;
    student.password = password || student.password;
    student.state = state || student.state;
    student.levelId = levelId || student.levelId;
    await student.save();
    return res.status(201).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
//////////////////////////// task section ////////////////////////////////////////
export const addTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { title, text } = req.body;
  try {
    const teacher = await Teacher.findById(req.user.id);
    const task = new Task({
      title,
      text,
      adminId: teacher?.adminId,
      teacherId: req.user.id,
    });
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }

  try {
    const tasks = await Task.find({ teacherId: req.user.id });
    if (!tasks) {
      return res.status(400).json("tasks not found");
    }
    return res.status(201).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};

export const getTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ teacherId: req.user.id, _id: taskId });
    if (!task) {
      return res.status(400).json("tasks not found");
    }
    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({
      teacherId: req.user.id,
      _id: taskId,
    });

    return res.status(201).json("task deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const updateTask= async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user) {
    return res.status(503);
  }
  const { taskId } = req.params;
  const{title,text}=req.body
  try {
    const task = await Task.findOne({
      teacherId: req.user.id,
      _id: taskId,
    });
    if(!task){
      return res.status(400).json("task not found")
    }
     task.title = title || task.title
     task.text = text || task.text;
     await task.save()

    return res.status(201).json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};