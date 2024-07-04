import mongoose, { Document, Schema } from "mongoose";
import ITask from "../interfaces/task.interface";
const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
