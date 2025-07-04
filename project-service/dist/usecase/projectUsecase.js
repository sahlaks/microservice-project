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
exports.ProjectUseCase = void 0;
const customErrors_1 = require("../constants/customErrors");
const messages_1 = require("../constants/messages");
class ProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    createProject(validatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectRepository.createProject(validatedData);
            if (!project) {
                throw new customErrors_1.InternalServerError("Failed to create project");
            }
            return { status: true, data: project, message: messages_1.PROJECT.PROJECT_CREATED };
        });
    }
    fetchAllProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield this.projectRepository.getProjects();
            if (!projects) {
                throw new customErrors_1.InternalServerError("Failed to fetch projects");
            }
            return { status: true, data: projects, message: messages_1.PROJECT.ALL_FETCHED };
        });
    }
}
exports.ProjectUseCase = ProjectUseCase;
