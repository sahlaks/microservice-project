"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeController = void 0;
const statusCodes_1 = require("../../constants/statusCodes");
class LikeController {
    constructor(likeUseCase) {
        this.likeUseCase = likeUseCase;
    }
    //@desc Get total like counts
    //@route GET /count/:id
    //@acess User
    getLikeCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectId = req.params.id;
            const result = yield this.likeUseCase.countLikes(projectId);
            res.status(statusCodes_1.ENUM.OK).json(result);
        });
    }
    //@desc Check if user liked or not
    //@route GET /check/:id
    //@acess User
    checkIfLiked(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const projectId = req.params.id;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.likeUseCase.checkIfLiked(projectId, userId);
            res.status(statusCodes_1.ENUM.OK).json(result);
        });
    }
    //@desc Toggle like
    //@route GET /toggle
    //@acess User
    toggleLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const projectId = req.params.id;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.likeUseCase.toggleLike(projectId, userId);
            res.status(statusCodes_1.ENUM.OK).json(result);
        });
    }
}
exports.LikeController = LikeController;
