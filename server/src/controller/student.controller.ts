import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { Request, Response } from "express";
import Level from "../models/level.model";
import Subject from "../models/subject.model";
import Task from "../models/task.model";
export const getStudentTask = async(req:Request,res:Response):Promise<Response>=>{
  if(!req.user){
    return res.status(503)
  }
  try {
    const student = await Student.findById(req.user.id)
    if(!student){
      return res.status(400).json("student don t found")
    }

    const task = await Task.findOne({teacherId:student.teacherId})
    return res.status(200).json(task)
  } catch (error) {
    console.log(error)
    return res.status(500).json('error from the serve')
  }
}