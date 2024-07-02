import mongoose, { Document, Schema } from "mongoose";
export default interface ITask extends Document {
  title: string;
  text: string;
  adminId: mongoose.Schema.Types.ObjectId;
  teacherId: mongoose.Schema.Types.ObjectId;
}
