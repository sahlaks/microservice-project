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
const mongoose_1 = require("mongoose");
const customErrors_1 = require("../constants/customErrors");
const messages_1 = require("../constants/messages");
const producer_1 = require("../infrastructure/kafka/producer");
class ProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    //@Create Project
    createProject(validatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield this.projectRepository.createProject(validatedData);
            if (!project) {
                throw new customErrors_1.InternalServerError("Failed to create project");
            }
            return { status: true, data: project, message: messages_1.PROJECT.PROJECT_CREATED };
        });
    }
    //@Get all Projects
    fetchAllProjects(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const projects = yield this.projectRepository.getProjects(skip, limit);
            const totalCount = yield this.projectRepository.countProjects();
            if (!projects) {
                throw new customErrors_1.InternalServerError("Failed to fetch projects");
            }
            return {
                status: true,
                data: projects,
                message: messages_1.PROJECT.ALL_FETCHED,
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalItems: totalCount,
            };
        });
    }
    //@Delete Project
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.Types.ObjectId(id);
            const deleted = yield this.projectRepository.deleteProject(objectId);
            if (!deleted) {
                throw new customErrors_1.NotFoundError("Project not found");
            }
            yield producer_1.producer.send({
                topic: "project-deleted",
                messages: [
                    {
                        value: JSON.stringify({ projectId: id })
                    }
                ]
            });
            return { status: true, message: messages_1.PROJECT.PROJECT_DELETED };
        });
    }
    //@Edit Project
    editProject(validatedData, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectId = new mongoose_1.Types.ObjectId(id);
            const updated = yield this.projectRepository.editProject(validatedData, objectId);
            if (!updated) {
                throw new customErrors_1.NotFoundError("Project not found");
            }
            return { status: true, message: messages_1.PROJECT.PROJECT_UPDATED, data: updated };
        });
    }
}
exports.ProjectUseCase = ProjectUseCase;
