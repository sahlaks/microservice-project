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
exports.LikeRepository = void 0;
const likeModel_1 = require("../model/likeModel");
class LikeRepository {
    checkIfLiked(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield likeModel_1.likeModel.exists({ projectId, userId });
            console.log(exist);
            return !!exist;
        });
    }
    countLikes(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return likeModel_1.likeModel.countDocuments({ projectId });
        });
    }
    findByProjectAndUser(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield likeModel_1.likeModel.findOne({ projectId, userId });
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return likeModel_1.likeModel.findByIdAndDelete(id);
        });
    }
    createLike(projectId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return likeModel_1.likeModel.create({ projectId, userId });
        });
    }
}
exports.LikeRepository = LikeRepository;
