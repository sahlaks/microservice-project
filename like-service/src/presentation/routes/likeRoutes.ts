import express from 'express';
import { LikeRepository } from '../../infrastructure/repositories/likeRepository';
import { LikeUseCase } from '../../usecase/likeUsecase';
import { LikeController } from '../controller/likeController';
import { validateTokens } from '../middleware/validateToken';
import asyncHandler from '../../infrastructure/utils/asyncHandler';

const likeRouter = express.Router();
const likeRepository = new LikeRepository()
const likeUsecase = new LikeUseCase(likeRepository);
const likeController = new LikeController(likeUsecase);

likeRouter.get('/count/:id', asyncHandler(likeController.getLikeCount.bind(likeController)));
likeRouter.get('/check/:id', validateTokens, asyncHandler(likeController.checkIfLiked.bind(likeController)));
likeRouter.post('/toggle/:id', validateTokens, asyncHandler(likeController.toggleLike.bind(likeController)));

export default likeRouter;