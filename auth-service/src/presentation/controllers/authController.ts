import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../../usecases/authUsecase";
import { ENUM } from "../../constants/statusCode";
import { setAuthCookie } from "../../infrastructure/utils/setToken";

export class AuthController {
  constructor(private authUseCase: AuthUseCase) {}

  
  //@desc Create a new User
  //@route POST /signup
  //@acess User
  async createUser(req: Request, res: Response, next: NextFunction) {
    const response = await this.authUseCase.createUser(req.body);
    console.log(response);

    if (response.status && response.accessToken) {
      setAuthCookie(res, response.accessToken);
    }
    return res
      .status(response.status ? ENUM.CREATED : ENUM.BAD_REQUEST)
      .json({ status: response?.status, message: response?.message });
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
      .status(response.status ? ENUM.OK : ENUM.BAD_REQUEST)
      .json({ status: response?.status, message: response?.message });
  }
}
