import type { Response } from "express";

type SuccessResponse = {
  res: Response;
  status: number;
  data: any;
  message: string;
  meta?: unknown;
};

type ErrorResponse = {
  res: Response;
  status: number;
  message: string;
};

export const successResponse = ({
  res,
  status,
  data,
  message,
  meta,
}: SuccessResponse) => {
  return res.status(status).json({
    success: true,
    data,
    message,
    meta,
  });
};

export const errorResponse = ({ res, status, message }: ErrorResponse) => {
  return res.status(status).json({
    success: false,
    data: null,
    message,
  });
};
