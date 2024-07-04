import mongoose, { Schema, Document } from "mongoose";
import IAdmin from "../interfaces/admin.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema: Schema = new mongoose.Schema<IAdmin>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    schoolName: { type: String, required: true },
    offerNumber: { type: Number },
    currentTeacher: { type: Number, default: 0 },
  },
  { timestamps: true }
);
adminSchema.pre<IAdmin>("save", async function (next: Function) {
  //arrow function don t accept this
  const admin = this;
  if (admin.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
  }
  next();
});
adminSchema.methods.verifyPassword = async function (enterPassword: string) {
  return await bcrypt.compare(enterPassword, this.password);
};
adminSchema.methods.genToken = function () {
  //it work even
  const admin = this;
  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.SECRET_KEY || "secret key",
    {
      expiresIn: "15d",
    }
  );
  return token;
};
const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
