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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
            const _a = saved.toObject(), { password } = _a, safeUser = __rest(_a, ["password"]);
            return {
                status: true,
                user: safeUser,
                message: messages_1.REGISTRATION.USER_CREATED,
                accessToken,
            };
        });
    }
    //@login logic
    loginUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = credentials.email.trim().toLowerCase();
            const result = yield this.authRepository.findUserByEmail(email);
            if (!result) {
                return { status: false, message: messages_1.REGISTRATION.NOT_EXIST };
            }
            const isPasswordCorrect = yield (0, password_1.checkPasswordMatch)(credentials.password, result.password);
            if (!isPasswordCorrect) {
                return { status: false, message: messages_1.REGISTRATION.WRONG_PASSWORD };
            }
            const accessToken = (0, jwtCreation_1.generateToken)(result._id);
            const _a = result.toObject(), { password } = _a, safeUser = __rest(_a, ["password"]);
            return {
                status: true,
                user: safeUser,
                message: messages_1.REGISTRATION.USER_VALID,
                accessToken,
            };
        });
    }
}
exports.AuthUseCase = AuthUseCase;
