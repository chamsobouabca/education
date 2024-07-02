import mongoose, { Document, Schema } from "mongoose";
import IUser from "./user.interface";
export default interface ITeacher extends IUser {
  levelId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
  role: string;
  subjectId: mongoose.Schema.Types.ObjectId;
  state: string;
  offerNumber: number;
  currentStudent: number;
}
