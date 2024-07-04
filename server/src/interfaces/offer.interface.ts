import mongoose, { Document } from "mongoose";
export default interface IOffer extends Document {
  offerNumber: number;
  maxTeacher: number;
  maxStudent: number;
}
