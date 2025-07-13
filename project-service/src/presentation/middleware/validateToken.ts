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
): Promise<void> => {
  try {
    const cookieHeader = req.headers.cookie;

    const authRes = await axios.get("http://auth-service:5001/api/auth/me", {
      headers: {
        Cookie: cookieHeader,
      },
      validateStatus: () => true,
    });

    const data = authRes.data;

    if (!data.status) {
      
      res.status(data.code || 401).json({
        success: false,
        message: data.message || "Unauthorized",
      });
      return; 
    }

    req.user = { id: data.user.id };
    next();
  } catch (error: any) {
    console.error("Auth validation failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to validate token with auth service",
    });
  }
};