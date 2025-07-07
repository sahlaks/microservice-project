import { Request, Response, NextFunction } from "express";
import axios from "axios";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const validateTokens = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('inside validate');
    const cookieHeader = req.headers.cookie;
    const authRes = await axios.get("http://auth-service:5001/api/auth/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });
console.log(authRes);

    req.user = { id: authRes.data?.user?.id };
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
