import Admin from "../models/admin.model";

import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { Request, Response } from "express";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fullName, email, password, schoolName, role, offerNumber } = req.body;
  try {
    const existAdmin = await Admin.findOne({ email: email });
    if (existAdmin) {
      return res.status(400).json("user already exist");
    }
    const user = new Admin({
      fullName,
      email,
      password,
      schoolName,
      offerNumber,
    });
    await user.save();

    return res
      .status(200)
      .cookie("typeScript", user.genToken(), {
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server");
  }
};
export const logIn = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, role } = req.body;
  try {
    if (role === "admin") {
      const user = await Admin.findOne({ email: email });
      if (!user) {
        return res.status(400).json("user not found");
      }
      const valid: boolean = await user.verifyPassword(password);
      if (!valid) {
        return res.status(400).json("password not valid");
      }
      return res
        .status(200)
        .cookie("typeScript", user.genToken(), {
          maxAge: 15 * 24 * 60 * 60 * 1000,
        })
        .json(user);
    }
    if (role === "teacher") {
      const user = await Teacher.findOne({ email: email });
      if (!user) {
        return res.status(400).json("user not found");
      }
      const valid: boolean = await user.verifyPassword(password);
      if (!valid) {
        return res.status(400).json("password not valid");
      }

      return res
        .status(200)
        .cookie("typeScript", user.genToken(), {
          maxAge: 15 * 24 * 60 * 60 * 1000,
        })
        .json(user);
    }
    if (role === "student") {
      const user = await Student.findOne({ email: email });
      if (!user) {
        return res.status(400).json("user not found");
      }
      const valid: boolean = await user.verifyPassword(password);
      if (!valid) {
        return res.status(400).json("password not valid");
      }

      return res
        .status(200)
        .cookie("typeScript", user.genToken(), {
          maxAge: 15 * 24 * 60 * 60 * 1000,
        })
        .json(user);
    }
    //the last
    return res.status(400).json("role not found");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
