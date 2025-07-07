"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR = exports.TOKEN = exports.REGISTRATION = void 0;
exports.REGISTRATION = {
    USER_CREATED: "Signup successfull!",
    USER_EXISTS: "User already exists",
    NOT_EXIST: "User not exist!",
    WRONG_PASSWORD: "Wrong password!",
    ERROR: "An error occurred!",
    USER_VALID: "Login successfully!",
    LOGOUT: 'Logged out successfully!'
};
exports.TOKEN = {
    REFRESHTOKEN_EXPIRED: "Refresh Token Expired",
    ACCESSTOKEN_EXPIRED: "Access Token Expired",
    REFRESHED: 'Token updated',
    INVALID: "Invalid Refresh Token",
};
exports.ERROR = {
    INTERNAL: "Internal Server Error"
};
