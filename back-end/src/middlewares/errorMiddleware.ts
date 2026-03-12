import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../helper/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  errorResponse({ res, status, message });
};
