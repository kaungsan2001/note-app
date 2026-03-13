import type { NextFunction, Request, Response } from "express";
import { prisma } from "../db/db";
import { generateToken } from "../helper/token";
import { hashPassword, comparePassword } from "../helper/hasher";
import createHttpError from "http-errors";
import { successResponse } from "../helper/response";
import { clearCookie, sendCookie } from "../helper/sendCookie";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return next(createHttpError(400, "User already exists"));
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user",
      },
    });

    const authToken = generateToken(user.id, user.role);

    sendCookie(res, authToken);

    const { password: removedPassword, ...userWithoutPassword } = user;

    successResponse({
      res,
      status: 201,
      data: userWithoutPassword,
      message: "User created successfully",
    });
  } catch (error: any) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return next(createHttpError(401, "Invalid email or password"));
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid email or password"));
    }

    const authToken = generateToken(user.id, user.role);

    sendCookie(res, authToken);

    const { password: removedPassword, ...userWithoutPassword } = user;

    successResponse({
      res,
      status: 200,
      data: userWithoutPassword,
      message: "User logged in successfully",
    });
  } catch (error: any) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    clearCookie(res);
    successResponse({
      res,
      status: 200,
      data: null,
      message: "User signed out successfully",
    });
  } catch (error: any) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });
    successResponse({
      res,
      status: 200,
      data: user,
      message: "User fetched successfully",
    });
  } catch (error: any) {
    console.log(error);
    next(createHttpError(500, "Internal Server Error"));
  }
};
