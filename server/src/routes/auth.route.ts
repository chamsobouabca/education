import { logIn, signUp } from "../controller/auth.controller";
import { createOffer } from "../controller/offer.controller";
import { Router } from "express";
import { protectedRoute } from "../middleware/protectedRoute";
import { Request, Response } from "express";
const router = Router();
router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.get("/pro", protectedRoute, (req: Request, res: Response) => {
  res.status(200).json(req.user)
  console.log(req.user);
});

router.post("/createOffer", createOffer);
export default router;
