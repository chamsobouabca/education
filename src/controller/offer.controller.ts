import { Request, Response } from "express";
import Offer from "../models/offer.model";
export const createOffer = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { offerNumber, maxTeacher, maxStudent } = req.body;
  try {
    const offer = new Offer({
      maxTeacher: maxTeacher,
      maxStudent: maxStudent,
      offerNumber: offerNumber,
    });
    await offer.save()
    return res.status(201).json(offer);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error from the serve");
  }
};
