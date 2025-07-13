"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeRepository_1 = require("../../infrastructure/repositories/likeRepository");
const likeUsecase_1 = require("../../usecase/likeUsecase");
const likeController_1 = require("../controller/likeController");
const validateToken_1 = require("../middleware/validateToken");
const asyncHandler_1 = __importDefault(require("../../infrastructure/utils/asyncHandler"));
const likeRouter = express_1.default.Router();
const likeRepository = new likeRepository_1.LikeRepository();
const likeUsecase = new likeUsecase_1.LikeUseCase(likeRepository);
const likeController = new likeController_1.LikeController(likeUsecase);
likeRouter.get('/count/:id', (0, asyncHandler_1.default)(likeController.getLikeCount.bind(likeController)));
likeRouter.get('/check/:id', validateToken_1.validateTokens, (0, asyncHandler_1.default)(likeController.checkIfLiked.bind(likeController)));
likeRouter.post('/toggle/:id', validateToken_1.validateTokens, (0, asyncHandler_1.default)(likeController.toggleLike.bind(likeController)));
exports.default = likeRouter;
