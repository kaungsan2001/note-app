import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/db";
import createHttpError from "http-errors";
import { successResponse } from "../helper/response";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalNotes = await prisma.note.count();

    successResponse({
      res,
      status: 200,
      data: { totalUsers, totalNotes },
      message: "Dashboard stats fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  try {
    const users = await prisma.user.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: { select: { notes: true } },
      },
    });
    const totalCount = await prisma.user.count();
    const meta = {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
    };
    successResponse({ res, status: 200, data: users, message: "Users", meta });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};

export const deleteUserAcc = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req.user?.role;
    if (role !== "admin") {
      return next(createHttpError(403, "Forbidden: Admin access only."));
    }
    const userId = Number(req.params.userId);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return next(createHttpError(404, "User Not Found."));
    }

    if (user.role === "admin") {
      return next(createHttpError(403, "Cannot delete admin user."));
    }

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    successResponse({
      res,
      status: 200,
      data: deletedUser,
      message: "User and their notes deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};

export const deleteAdminNote = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = req.user?.role;
    if (role !== "admin") {
      return next(createHttpError(403, "Forbidden: Admin access only."));
    }
    const noteId = Number(req.params.noteId);

    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return next(createHttpError(404, "Note Not Found."));
    }

    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
    });

    successResponse({
      res,
      status: 200,
      data: deletedNote,
      message: "Note deleted successfully by Admin.",
    });
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};
