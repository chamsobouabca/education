import { logIn, signUp } from "../controller/auth.controller";
import { createOffer } from "../controller/offer.controller";
import { Router } from "express";
import { protectedRoute } from "../middleware/protectedRoute";
import { Request, Response } from "express";
const router = Router();
router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.get("/pro", protectedRoute, (req: Request, res: Response) => {
  console.log(req.user);
});

router.post("/createOffer", createOffer);
export default router;
