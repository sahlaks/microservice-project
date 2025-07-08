import { NextFunction, Request, Response } from "express";
import { LikeUseCase } from "../../usecase/likeUsecase";
import { AuthRequest } from "../middleware/validateToken";
import { ENUM } from "../../constants/statusCodes";

export class LikeController {
  constructor(private likeUseCase: LikeUseCase) {}

  //@desc Get total like counts
  //@route GET /count/:id
  //@acess User
  async getLikeCount(req: Request, res: Response, next: NextFunction) {
    const projectId = req.params.id;
    const result = await this.likeUseCase.countLikes(projectId)
    res.status(ENUM.OK).json(result)
  }

  //@desc Check if user liked or not
  //@route GET /check/:id
  //@acess User
  async checkIfLiked(req: AuthRequest, res: Response, next: NextFunction) {
     const projectId = req.params.id;
    const userId = req.user?.id as string;
    const result = await this.likeUseCase.checkIfLiked(projectId, userId);
    res.status(ENUM.OK).json(result)
  }

  //@desc Toggle like
  //@route GET /toggle
  //@acess User
  async toggleLike(req: AuthRequest, res: Response, next: NextFunction) {
     const projectId = req.params.id;
    const userId = req.user?.id as string;
    const result = await this.likeUseCase.toggleLike(projectId,userId);
     res.status(ENUM.OK).json(result);
  }
}
