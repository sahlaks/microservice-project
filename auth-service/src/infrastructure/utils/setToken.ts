import { Response } from "express";

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 48 * 60 * 60 * 1000,
  });
};
