import { NextFunction, Request, Response } from "express";
import { ProjectUseCase } from "../../usecase/projectUsecase";
import { projectSchema } from "../../domain/types/projectSchema";
import { STATUS_CODES } from "../../constants/statusCodes";

export class ProjectController {
    constructor(private projectUseCase: ProjectUseCase){}

    //@desc Create a new Project
    //@route POST /create
    //@acess User
    async createProject(req: Request, res: Response, next: NextFunction){
        const validatedData = projectSchema.parse(req.body)
        const response = await this.projectUseCase.createProject(validatedData);
        if(response.status) {
            res.status(STATUS_CODES.OK).json({status: response?.status, data: response?.data, message: response?.message})
        }
    }

    //@desc Get all Projects from database
    //@route GET /fetch-all
    //@acess User
    async fetchAllProjects(req: Request, res: Response, next: NextFunction){
        const response = await this.projectUseCase.fetchAllProjects();
        if(response?.status) {
            res.status(STATUS_CODES.OK).json({status: response?.status, data: response?.data, message: response?.message})
        }
    }
}