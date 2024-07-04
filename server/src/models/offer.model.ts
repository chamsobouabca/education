import mongoose, { Schema, Document } from "mongoose";
import IOffer from "../interfaces/offer.interface";
const offerSchema = new Schema<IOffer>({
  offerNumber: { type: Number, required: true },
  maxTeacher: { type: Number, required: true },
  maxStudent: { type: Number, required: true },
});
const Offer = mongoose.model<IOffer>("Offer", offerSchema);
export default Offer;
