"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.projectSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, "Title is required"),
    description: zod_1.default.string().min(1, "Description is required"),
    url: zod_1.default.string().url("Invalid URL").optional().or(zod_1.default.literal("")),
    createdBy: zod_1.default.string().min(1, "User ID is required"),
});
