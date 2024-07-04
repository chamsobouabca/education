import mongoose, { Document, Schema } from "mongoose";
import ILevel from "../interfaces/level.interface";
const levelSchema = new Schema<ILevel>(
  {
    name: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);
const Level = mongoose.model<ILevel>("Level", levelSchema);
export default Level;
