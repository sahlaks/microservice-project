"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookie = exports.setAuthCookie = void 0;
const setAuthCookie = (res, token) => {
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 48 * 60 * 60 * 1000,
    });
};
exports.setAuthCookie = setAuthCookie;
const clearCookie = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    });
};
exports.clearCookie = clearCookie;
