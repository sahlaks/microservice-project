"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectRepository_1 = require("../../infrastructure/repositories/projectRepository");
const projectUsecase_1 = require("../../usecase/projectUsecase");
const projectController_1 = require("../controller/projectController");
const asyncHandler_1 = __importDefault(require("../../infrastructure/utils/asyncHandler"));
const projectRouter = express_1.default.Router();
const projectRepository = new projectRepository_1.ProjectRepository();
const projectUsecase = new projectUsecase_1.ProjectUseCase(projectRepository);
const projectController = new projectController_1.ProjectController(projectUsecase);
projectRouter.post('/', (0, asyncHandler_1.default)(projectController.createProject.bind(projectController)));
projectRouter.get('/', (0, asyncHandler_1.default)(projectController.fetchAllProjects.bind(projectController)));
projectRouter.delete('/', (0, asyncHandler_1.default)(projectController.deleteProject.bind(projectController)));
projectRouter.put('/', (0, asyncHandler_1.default)(projectController.editProject.bind(projectController)));
exports.default = projectRouter;
