import mongoose, { Schema } from "mongoose";

import IStudent from "../interfaces/student.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const studentSchema = new Schema<IStudent>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    state : {type:String},

    role: { type: String, default: "student" },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    levelId: { type: mongoose.Schema.Types.ObjectId },
    adminId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);
studentSchema.pre<IStudent>("save", async function (next: Function) {
  //arrow function don t accept this
  const student = this;
  if (student.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  }
  next();
});
studentSchema.methods.verifyPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};
studentSchema.methods.genToken = function () {
  //it work even
  const student = this;
  const token = jwt.sign(
    { id: student._id, role: student.role },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "15d",
    }
  );
  return token;
};
const Student = mongoose.model<IStudent>("Student", studentSchema);
export default Student;
