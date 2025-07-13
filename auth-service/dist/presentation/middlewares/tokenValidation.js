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
exports.validateTokens = void 0;
const statusCode_1 = require("../../constants/statusCode");
const messages_1 = require("../../constants/messages");
const verifyToken_1 = require("../../infrastructure/utils/verifyToken");
const validateTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('inside auth-service');
        const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.access_token;
        if (!accessToken) {
            res.status(statusCode_1.ENUM.UNAUTHORIZED).json({
                status: false,
                message: messages_1.TOKEN.ACCESSTOKEN_EXPIRED,
            });
        }
        const decoded = (0, verifyToken_1.verifyAccessToken)(accessToken);
        if (!decoded || !decoded.id) {
            res.status(statusCode_1.ENUM.UNAUTHORIZED).json({
                status: false,
                message: messages_1.TOKEN.INVALID,
            });
        }
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        console.error("Token validation error:", err);
        res.status(statusCode_1.ENUM.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: messages_1.ERROR.INTERNAL,
        });
    }
});
exports.validateTokens = validateTokens;
