import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { me } from "../controllers/authController";

const router = Router();

router.get("/me", authMiddleware, me);

export default router;
