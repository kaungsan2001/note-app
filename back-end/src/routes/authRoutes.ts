import { Router } from "express";
import { signin, signUp, signOut, me } from "../controllers/authController.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import {
  signInValidator,
  signUpValidator,
} from "../validators/authValidator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/sign-up", validateMiddleware, signUpValidator, signUp);
router.post("/sign-in", validateMiddleware, signInValidator, signin);
router.delete("/sign-out", authMiddleware, signOut);
router.get("/me", authMiddleware, me);

export default router;
