import mongoose, { Document, Schema } from "mongoose";
import ISubject from "../interfaces/subject.interface";
const subjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
    levelId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const Subject = mongoose.model<ISubject>("Subject", subjectSchema);
export default Subject;
