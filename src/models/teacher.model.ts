import mongoose, { Schema } from "mongoose";
import ITeacher from "../interfaces/teacher.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const teacherSchema = new Schema<ITeacher>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: String, default: "teacher" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    levelId: { type: mongoose.Schema.Types.ObjectId, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    offerNumber: { type: Number },
    currentStudent: { type: Number, default: 0 },
  },
  { timestamps: true }
);
teacherSchema.pre<ITeacher>("save", async function (next: Function) {
  //arrow function don t accept this
  const teacher = this;
  if (teacher.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    teacher.password = await bcrypt.hash(teacher.password, salt);
  }
  next();
});
teacherSchema.methods.verifyPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};
teacherSchema.methods.genToken = function () {
  //it work even
  const teacher = this;
  const token = jwt.sign(
    { id: teacher._id, role: teacher.role },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "15d",
    }
  );
  return token;
};
const Teacher = mongoose.model<ITeacher>("Teacher", teacherSchema);
export default Teacher;
