"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRepository_1 = require("../../infrastructure/repositories/authRepository");
const authUsecase_1 = require("../../usecases/authUsecase");
const authController_1 = require("../controllers/authController");
const asyncHandler_1 = __importDefault(require("../../infrastructure/utils/asyncHandler"));
const authRouter = express_1.default.Router();
const authRepository = new authRepository_1.AuthRepository();
const authUsecase = new authUsecase_1.AuthUseCase(authRepository);
const authController = new authController_1.AuthController(authUsecase);
authRouter.post('/login', (0, asyncHandler_1.default)(authController.loginUser.bind(authController)));
authRouter.post('/signup', (0, asyncHandler_1.default)(authController.createUser.bind(authController)));
authRouter.post('/logout', (0, asyncHandler_1.default)(authController.logoutUser.bind(authController)));
exports.default = authRouter;
