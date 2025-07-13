import { NextFunction, Request, Response } from "express";
import { ENUM } from "../../constants/statusCode";
import { ERROR, TOKEN } from "../../constants/messages";
import { verifyAccessToken } from "../../infrastructure/utils/verifyToken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
     message?: string;
  };
}

export const validateTokens = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    console.log('inside auth-service');
    
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
      res.status(ENUM.UNAUTHORIZED).json({
        status: false,
        message: TOKEN.ACCESSTOKEN_EXPIRED,
      });
    }

    const decoded = verifyAccessToken(accessToken);

    if (!decoded || !decoded.id) {
      res.status(ENUM.UNAUTHORIZED).json({
        status: false,
        message: TOKEN.INVALID,
      });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("Token validation error:", err);
    res.status(ENUM.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: ERROR.INTERNAL,
    });
  }
};
