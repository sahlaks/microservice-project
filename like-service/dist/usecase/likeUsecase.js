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
exports.LikeUseCase = void 0;
class LikeUseCase {
    constructor(likeRepository) {
        this.likeRepository = likeRepository;
    }
    countLikes(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.likeRepository.countLikes(projectId);
            return { count };
        });
    }
    checkIfLiked(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.likeRepository.checkIfLiked(projectId, userId);
            return { liked: exists };
        });
    }
    toggleLike(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingLike = yield this.likeRepository.findByProjectAndUser(projectId, userId);
            if (existingLike) {
                yield this.likeRepository.deleteById(existingLike._id);
                return { liked: false, pId: projectId };
            }
            yield this.likeRepository.createLike(projectId, userId);
            return { liked: true, pId: projectId };
        });
    }
}
exports.LikeUseCase = LikeUseCase;
