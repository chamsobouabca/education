import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import Admin from "../models/admin.model";
import Offer from "../models/offer.model";
import Teacher from "../models/teacher.model";

interface JwtPayload {
  id: string;
  role: string;

  // Add other relevant properties as needed
}

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.typeScript; // Assuming token is stored in 'auth-token' cookie

  console.log(token);
  if (!token) {
    return res.sendStatus(401); // Unauthorized if token is not present
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as JwtPayload;

    // Attach decoded payload to req.user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.sendStatus(403); // Forbidden if token is invalid or expired
  }
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Unauthorized access. Admin role required." });
  }
};
export const verifyTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Unauthorized access. teacher role required" });
  }
};
export const verifyStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Unauthorized access. teacher role required" });
  }
};

export const checkAdminLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const admin = await Admin.findOne({ _id: req.user.id });
    if (!admin) {
      return res.status(400).json("admin not found");
    }
    const offer = await Offer.findOne({ offerNumber: admin.offerNumber });
    if (!offer) {
      return res.status(400).json("offer not found");
    }
    if (admin.currentTeacher < offer.maxTeacher) {
      admin.currentTeacher += 1;
      await admin.save();
     return  next();
    }
    return res.status(400).json("you have limit");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};
export const checkTeacherLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(503);
  }
  try {
    const teacher = await Teacher.findOne({ _id: req.user.id });
    if (!teacher) {
      return res.status(400).json("admin not found");
    }
    const offer = await Offer.findOne({ offerNumber: teacher.offerNumber });
    if (!offer) {
      return res.status(400).json("offer not found");
    }
    if (teacher.currentStudent < offer.maxStudent) {
      teacher.currentStudent += 1;
      await teacher.save();
      return next();
    }
    return res.status(400).json("you have limit");
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the server ");
  }
};

