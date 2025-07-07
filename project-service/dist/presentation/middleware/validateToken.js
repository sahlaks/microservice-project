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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokens = void 0;
const axios_1 = __importDefault(require("axios"));
const validateTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('inside validate');
        const cookieHeader = req.headers.cookie;
        const authRes = yield axios_1.default.get("http://auth-service:5001/api/auth/me", {
            headers: {
                Cookie: cookieHeader,
            },
        });
        console.log(authRes);
        req.user = { id: (_b = (_a = authRes.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id };
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});
exports.validateTokens = validateTokens;
