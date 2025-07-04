import { Schema, Types } from "mongoose";
import { InternalServerError, NotFoundError } from "../constants/customErrors";
import { PROJECT } from "../constants/messages";
import { IProjectRepository } from "../domain/interface/IProjectRepository";
import { ProjectType } from "../domain/types/projectSchema";

export class ProjectUseCase {
  constructor(private projectRepository: IProjectRepository) {}

  //@Create Project
  async createProject(validatedData: ProjectType) {
    const project = await this.projectRepository.createProject(validatedData);
    if (!project) {
      throw new InternalServerError("Failed to create project");
    }
    return { status: true, data: project, message: PROJECT.PROJECT_CREATED };
  }

  //@Get all Projects
  async fetchAllProjects(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const projects = await this.projectRepository.getProjects(skip, limit);
    const totalCount = await this.projectRepository.countProjects();
    if (!projects) {
      throw new InternalServerError("Failed to fetch projects");
    }

    return {
      status: true,
      data: projects,
      message: PROJECT.ALL_FETCHED,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
    };
  }

  //@Delete Project
  async deleteProject(id: string) {
    const objectId = new Types.ObjectId(id)
    const deleted = await this.projectRepository.deleteProject(objectId);
    if(!deleted) {
        throw new NotFoundError("Project not found")
    }
    return { status: true, message: PROJECT.PROJECT_DELETED}
  }

  //@Edit Project
  async editProject(validatedData: ProjectType,id: string) {
    const objectId = new Types.ObjectId(id);
    const updated = await this.projectRepository.editProject(validatedData,objectId)
    if(!updated) {
        throw new NotFoundError("Project not found")
    }
    return {status: true, message: PROJECT.PROJECT_UPDATED, data: updated}
  }
}
