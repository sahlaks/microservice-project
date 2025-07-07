import express from 'express';
import { AuthRepository } from '../../infrastructure/repositories/authRepository';
import { AuthUseCase } from '../../usecases/authUsecase';
import { AuthController } from '../controllers/authController';
import asyncHandler from '../../infrastructure/utils/asyncHandler';
import { validateTokens } from '../middlewares/tokenValidation';

const authRouter = express.Router();
const authRepository = new AuthRepository()
const authUsecase = new AuthUseCase(authRepository)
const authController = new AuthController(authUsecase)

authRouter.post('/login', asyncHandler(authController.loginUser.bind(authController)));
authRouter.post('/signup', asyncHandler(authController.createUser.bind(authController)));
authRouter.get('/me', validateTokens, asyncHandler(authController.validateUser.bind(authController)));
authRouter.post('/logout', asyncHandler(authController.logoutUser.bind(authController)))
export default authRouter;
