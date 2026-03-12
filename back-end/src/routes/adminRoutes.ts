import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getDashboardStats,
  getUsers,
  deleteUserAcc,
  deleteAdminNote,
} from "../controllers/adminController";

const adminRouter = Router();

// Dashboard Stats Route
adminRouter.get("/stats", authMiddleware, getDashboardStats);

// Get All Users Route
adminRouter.get("/users", authMiddleware, getUsers);

// Delete User Account Route
adminRouter.delete("/user/:userId", authMiddleware, deleteUserAcc);

// Delete Note via Admin Route
adminRouter.delete("/note/:noteId", authMiddleware, deleteAdminNote);

export default adminRouter;
