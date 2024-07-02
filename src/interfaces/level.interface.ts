import mongoose, { Document } from "mongoose";
export default interface ILevel extends Document {
  name: string;
  adminId : mongoose.Schema.Types.ObjectId
}
