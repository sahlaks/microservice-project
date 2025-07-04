import { NextFunction, Request, Response } from "express";
import { ProjectUseCase } from "../../usecase/projectUsecase";
import { projectSchema } from "../../domain/types/projectSchema";
import { STATUS_CODES } from "../../constants/statusCodes";
import { any } from "zod";

export class ProjectController {
  constructor(private projectUseCase: ProjectUseCase) {}

  //@desc Create a new Project
  //@route POST /create
  //@acess User
  async createProject(req: Request, res: Response, next: NextFunction) {
    const validatedData = projectSchema.parse(req.body);
    const response = await this.projectUseCase.createProject(validatedData);
    if (response.status) {
      res.status(STATUS_CODES.OK).json({
        status: response?.status,
        data: response?.data,
        message: response?.message,
      });
    }
  }

  //@desc Get all Projects from database
  //@route GET /fetch-all
  //@acess User
  async fetchAllProjects(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    const response = await this.projectUseCase.fetchAllProjects(page, limit);
    if (response?.status) {
      res.status(STATUS_CODES.OK).json({
        status: response?.status,
        data: response?.data,
        message: response?.message,
        currentPage: response?.currentPage,
        totalPages: response?.totalPages,
        totalItems: response?.totalItems,
      });
    }
  }

  //@desc Delete a Project from database
  //@route DELETE /delete
  //@acess User
  async deleteProject(req: Request, res: Response, next: NextFunction) {
    const id = req.query.id as string;
    const response = await this.projectUseCase.deleteProject(id);
    if (response.status) {
      res
        .status(STATUS_CODES.OK)
        .json({ status: response?.status, message: response?.message });
    }
  }

  //@desc Edit a Project from database
  //@route PUT /update
  //@acess User
  async editProject(req: Request, res: Response, next: NextFunction) {
    const validatedData = projectSchema.parse(req.body);
    const id = req.query.id as string;
    const response = await this.projectUseCase.editProject(validatedData,id);
    if(response?.status) {
        res.status(STATUS_CODES.OK).json({status: response?.status, data: response?.data, message: response?.message})
    }
  }
}
