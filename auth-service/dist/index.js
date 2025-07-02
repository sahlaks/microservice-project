"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/config/app");
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = require("./infrastructure/config/connectDb");
dotenv_1.default.config();
(0, connectDb_1.connectDb)();
app_1.server.listen(process.env.PORT, () => console.log("Server connected successfully!!"));
