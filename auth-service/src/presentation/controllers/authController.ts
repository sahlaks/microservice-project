import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../../usecases/authUsecase";
import { ENUM } from "../../constants/statusCode";
import { clearCookie, setAuthCookie } from "../../infrastructure/utils/tokenHandler";
import { REGISTRATION } from "../../constants/messages";

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}


  //@desc Create a new User
  //@route POST /signup
  //@acess User
  async createUser(req: Request, res: Response, next: NextFunction) {
    const response = await this.authUseCase.createUser(req.body);
    
    if (response.status && response.accessToken) {
      setAuthCookie(res, response.accessToken);
    }
    return res
      .status(response.status ? ENUM.CREATED : ENUM.BAD_REQUEST)
      .json({ status: response?.status, user: response?.user, message: response?.message });
  }


  //@desc Login a User
  //@route POST /login
  //@acess User
  async loginUser(req: Request, res: Response, next: NextFunction) {
    const response = await this.authUseCase.loginUser(req.body)
  
    if (response.status && response.accessToken) {
      setAuthCookie(res, response.accessToken);
    }
     return res
      .status(response.status ? ENUM.OK : ENUM.UNAUTHORIZED)
      .json({ status: response?.status, user: response?.user, message: response?.message });
  }

//@desc Logout User
//@ROUTE POST /logout
//@acess User
  async logoutUser(req: Request, res: Response, next: NextFunction) {
    clearCookie(req,res);
    res.status(ENUM.OK).json({status: true, message: REGISTRATION.LOGOUT})
  }
}
