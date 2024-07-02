import mongoose,{ Document } from "mongoose";
export default interface ISubject extends Document {
  name: string;
  levelId: mongoose.Schema.Types.ObjectId;
  adminId: mongoose.Schema.Types.ObjectId;
}
