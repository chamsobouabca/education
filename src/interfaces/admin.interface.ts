import mongoose, { Document } from "mongoose";
import IUser from "./user.interface";
export default interface IAdmin extends IUser {
  schoolName: string;
  role: string;
  offerNumber: number;
  currentTeacher: number;
}
