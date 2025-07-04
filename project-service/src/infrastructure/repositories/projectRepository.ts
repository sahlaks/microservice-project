import { IProject } from "../../domain/entities/Project";
import { IProjectRepository } from "../../domain/interface/IProjectRepository";
import { ProjectType } from "../../domain/types/projectSchema";
import { projectModel } from "../models/projectModels";

export class ProjectRepository implements IProjectRepository {
    async createProject(data: ProjectType): Promise<IProject> {
        const saveproject = await projectModel.create(data);
        return saveproject;
    }

    async getProjects(): Promise<IProject[]> {
        const projects = await projectModel.find().sort({ createdAt: -1});
        return projects;
    }
}