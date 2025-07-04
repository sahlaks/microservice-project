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
exports.ProjectController = void 0;
const projectSchema_1 = require("../../domain/types/projectSchema");
const statusCodes_1 = require("../../constants/statusCodes");
class ProjectController {
    constructor(projectUseCase) {
        this.projectUseCase = projectUseCase;
    }
    //@desc Create a new Project
    //@route POST /create
    //@acess User
    createProject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = projectSchema_1.projectSchema.parse(req.body);
            const response = yield this.projectUseCase.createProject(validatedData);
            if (response.status) {
                res.status(statusCodes_1.STATUS_CODES.OK).json({ status: response === null || response === void 0 ? void 0 : response.status, data: response === null || response === void 0 ? void 0 : response.data, message: response === null || response === void 0 ? void 0 : response.message });
            }
        });
    }
    //@desc Get all Projects from database
    //@route GET /fetch-all
    //@acess User
    fetchAllProjects(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.projectUseCase.fetchAllProjects();
            if (response === null || response === void 0 ? void 0 : response.status) {
                res.status(statusCodes_1.STATUS_CODES.OK).json({ status: response === null || response === void 0 ? void 0 : response.status, data: response === null || response === void 0 ? void 0 : response.data, message: response === null || response === void 0 ? void 0 : response.message });
            }
        });
    }
}
exports.ProjectController = ProjectController;
