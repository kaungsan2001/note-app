import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  createANote,
  updateANoteById,
  getANoteById,
  getNotes,
  deleteANoteById,
} from "../controllers/noteController";
import {
  createNoteValidator,
  updateNoteValidator,
  noteIdValidator,
} from "../validators/noteValidator";
import { validateMiddleware } from "../middlewares/validateMiddleware";
const noteRouter = Router();

noteRouter.get("/", authMiddleware, getNotes);

noteRouter.get(
  "/:noteId",
  authMiddleware,
  noteIdValidator,
  validateMiddleware,
  getANoteById,
);

noteRouter.post(
  "/create",
  authMiddleware,
  validateMiddleware,
  createNoteValidator,
  createANote,
);

noteRouter.put(
  "/update/:noteId",
  authMiddleware,
  validateMiddleware,
  updateNoteValidator,
  updateANoteById,
);
noteRouter.delete(
  "/:noteId",
  authMiddleware,
  noteIdValidator,
  validateMiddleware,
  deleteANoteById,
);

export default noteRouter;
