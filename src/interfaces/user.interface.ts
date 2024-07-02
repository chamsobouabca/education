import mongoose, { Document, Schema } from "mongoose";
export default interface IUser extends Document {
  //access to some function like save remove populate and have 53 other attribute
  fullName: string;
  email: string;
  password: string;
  genToken(): string;
  verifyPassword(password : string):boolean
}
