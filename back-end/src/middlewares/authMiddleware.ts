import type { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { verifyToken } from "../helper/token.js";
import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayLoad;
    }
  }
}

interface TokenPayLoad extends JwtPayload {
  id: number;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(createHttpError(401, "Not authorized, no token"));
  }

  try {
    const decoded = verifyToken(token) as TokenPayLoad | null;
    if (!decoded) {
      return next(createHttpError(401, "Not authorized, token failed"));
    }
    req.user = decoded;
    next();
  } catch (error) {
    next(createHttpError(401, "Not authorized, token failed"));
  }
};
