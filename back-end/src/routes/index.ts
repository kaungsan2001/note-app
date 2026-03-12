import express from "express";
import authRoutes from "./authRoutes.js";
import noteRoutes from "./noteRoutes.js";
import adminRoutes from "./adminRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/note", noteRoutes);
router.use("/admin", adminRoutes);

export default router;
