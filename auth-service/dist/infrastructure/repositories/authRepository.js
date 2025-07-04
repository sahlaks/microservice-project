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
exports.AuthRepository = void 0;
const userModels_1 = require("../models/userModels");
class AuthRepository {
    /*..........................exist or nnot.......................*/
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModels_1.userModel.findOne({ email });
            return user;
        });
    }
    /*...........................save user.............................*/
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const savedUser = yield userModels_1.userModel.create(data);
            return savedUser;
        });
    }
}
exports.AuthRepository = AuthRepository;
