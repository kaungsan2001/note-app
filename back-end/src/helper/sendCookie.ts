import type { Response } from "express";

export const sendCookie = (res: Response, authToken: string) => {
  return res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
