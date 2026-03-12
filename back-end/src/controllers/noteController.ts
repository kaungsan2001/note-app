import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/db";
import createHttpError from "http-errors";
import { successResponse } from "../helper/response";

export const createANote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const { title, content, publish } = req.body;

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        publish,
        userId,
      },
    });
    successResponse({
      res,
      status: 201,
      data: newNote,
      message: "A new note created successfully.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const getANoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const noteId = req.params.noteId;
    const note = await prisma.note.findFirst({
      where: { id: Number(noteId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!note?.publish && note?.userId !== userId) {
      return next(createHttpError(403, "Note is not published"));
    }
    successResponse({ res, status: 200, data: note, message: "Note" });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user!.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  try {
    const notes = await prisma.note.findMany({
      where: {
        OR: [{ publish: true }, { userId }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });

    const totalCount = await prisma.note.count({
      where: {
        OR: [{ publish: true }, { userId }],
      },
    });
    const meta = {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    };
    successResponse({ res, status: 200, data: notes, message: "Notes", meta });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};

export const updateANoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.user!.id);
    const noteId = Number(req.params.noteId);
    const { title, content, publish } = req.body;

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { userId: true },
    });

    if (!note) {
      return next(createHttpError(404, "Note Not Found."));
    }

    if (userId !== note.userId) {
      return next(createHttpError(401, "Not Allowed."));
    }

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        title,
        content,
        publish,
      },
    });
    successResponse({
      res,
      status: 200,
      data: updatedNote,
      message: "Note updated successfully.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};

export const deleteANoteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.user!.id);
    const noteId = Number(req.params.noteId);

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { userId: true },
    });

    if (!note) {
      return next(createHttpError(404, "Note Not Found."));
    }

    if (userId !== note.userId) {
      return next(createHttpError(401, "Not Allowed."));
    }

    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
    });
    successResponse({
      res,
      status: 200,
      data: deletedNote,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};
