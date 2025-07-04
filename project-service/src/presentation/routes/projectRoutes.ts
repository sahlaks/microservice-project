import express from 'express';
import { ProjectRepository } from '../../infrastructure/repositories/projectRepository';
import { ProjectUseCase } from '../../usecase/projectUsecase';
import { ProjectController } from '../controller/projectController';
import asyncHandler from '../../infrastructure/utils/asyncHandler';

const projectRouter = express.Router();
const projectRepository = new ProjectRepository()
const projectUsecase = new ProjectUseCase(projectRepository);
const projectController = new ProjectController(projectUsecase);

projectRouter.post('/create', asyncHandler(projectController.createProject.bind(projectController)));
projectRouter.get('/fetch-all', asyncHandler(projectController.fetchAllProjects.bind(projectController)));
projectRouter.delete('/delete', asyncHandler(projectController.deleteProject.bind(projectController)));
projectRouter.put('/update', asyncHandler(projectController.editProject.bind(projectController)));

export default projectRouter;