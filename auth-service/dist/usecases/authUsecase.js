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
exports.AuthUseCase = void 0;
const messages_1 = require("../constants/messages");
const jwtCreation_1 = require("../infrastructure/jwtCreation");
const password_1 = require("../infrastructure/utils/password");
class AuthUseCase {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    //@ signup logic
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if user exist
            const existingUser = yield this.authRepository.findUserByEmail(data.email);
            if (existingUser)
                return { status: false, message: messages_1.REGISTRATION.USER_EXISTS };
            const hashedPassword = yield (0, password_1.generatePassword)(data.password);
            const userData = {
                username: data.username.trim(),
                email: data.email.trim().toLowerCase(),
                password: hashedPassword,
            };
            //save user
            const saved = yield this.authRepository.createUser(userData);
            if (!saved) {
                return { status: false, message: messages_1.REGISTRATION.ERROR };
            }
            const accessToken = (0, jwtCreation_1.generateToken)(saved._id);
            return {
                status: true,
                message: messages_1.REGISTRATION.USER_CREATED,
                accessToken,
            };
        });
    }
    //@login logic
    loginUser(credetials) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authRepository.findUserByEmail(credetials.email);
            if (!result) {
                return { status: false, message: messages_1.REGISTRATION.NOT_EXIST };
            }
            const isPasswordCorrect = yield (0, password_1.checkPasswordMatch)(credetials.password, result.password);
            if (!isPasswordCorrect) {
                return { status: false, message: messages_1.REGISTRATION.WRONG_PASSWORD };
            }
            const accessToken = (0, jwtCreation_1.generateToken)(result._id);
            return {
                status: true,
                message: messages_1.REGISTRATION.USER_VALID,
                accessToken,
            };
        });
    }
}
exports.AuthUseCase = AuthUseCase;
