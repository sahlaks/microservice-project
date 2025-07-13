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
exports.AuthController = void 0;
const statusCode_1 = require("../../constants/statusCode");
const tokenHandler_1 = require("../../infrastructure/utils/tokenHandler");
const messages_1 = require("../../constants/messages");
class AuthController {
    constructor(authUseCase) {
        this.authUseCase = authUseCase;
    }
    //@desc Create a new User
    //@route POST /signup
    //@acess User
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.authUseCase.createUser(req.body);
            if (response.status && response.accessToken) {
                (0, tokenHandler_1.setAuthCookie)(res, response.accessToken);
            }
            return res.status(response.status ? statusCode_1.ENUM.CREATED : statusCode_1.ENUM.BAD_REQUEST).json({
                status: response === null || response === void 0 ? void 0 : response.status,
                user: response === null || response === void 0 ? void 0 : response.user,
                message: response === null || response === void 0 ? void 0 : response.message,
            });
        });
    }
    //@desc Login a User
    //@route POST /login
    //@acess User
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.authUseCase.loginUser(req.body);
            if (response.status && response.accessToken) {
                (0, tokenHandler_1.setAuthCookie)(res, response.accessToken);
            }
            return res.status(response.status ? statusCode_1.ENUM.OK : statusCode_1.ENUM.UNAUTHORIZED).json({
                status: response === null || response === void 0 ? void 0 : response.status,
                user: response === null || response === void 0 ? void 0 : response.user,
                message: response === null || response === void 0 ? void 0 : response.message,
            });
        });
    }
    //@desc Validate User
    //@route GET /me
    //@acess User
    validateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log('auth controller');
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const message = (_b = req.user) === null || _b === void 0 ? void 0 : _b.message;
            res.status(statusCode_1.ENUM.OK).json({ status: true, user: { id: userId, message: message } });
        });
    }
    //@desc Logout User
    //@ROUTE POST /logout
    //@acess User
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, tokenHandler_1.clearCookie)(req, res);
            res.status(statusCode_1.ENUM.OK).json({ status: true, message: messages_1.REGISTRATION.LOGOUT });
        });
    }
}
exports.AuthController = AuthController;
