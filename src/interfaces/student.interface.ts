import mongoose, { Document } from "mongoose";
import IUser from "./user.interface";
export default interface IStudent extends IUser {
  teacherId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  levelId: mongoose.Schema.Types.ObjectId;
  role: string;
  state:string
}
