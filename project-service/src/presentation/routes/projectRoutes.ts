import express from 'express';
import { ProjectRepository } from '../../infrastructure/repositories/projectRepository';
import { ProjectUseCase } from '../../usecase/projectUsecase';
import { ProjectController } from '../controller/projectController';
import asyncHandler from '../../infrastructure/utils/asyncHandler';
import { validateTokens } from '../middleware/validateToken';

const projectRouter = express.Router();
const projectRepository = new ProjectRepository()
const projectUsecase = new ProjectUseCase(projectRepository);
const projectController = new ProjectController(projectUsecase);

projectRouter.post('/', validateTokens, asyncHandler(projectController.createProject.bind(projectController)));
projectRouter.get('/', validateTokens, asyncHandler(projectController.fetchAllProjects.bind(projectController)));
projectRouter.delete('/', validateTokens, asyncHandler(projectController.deleteProject.bind(projectController)));
projectRouter.put('/', validateTokens, asyncHandler(projectController.editProject.bind(projectController)));
 
export default projectRouter;