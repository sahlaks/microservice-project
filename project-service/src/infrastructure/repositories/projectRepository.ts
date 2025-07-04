import { Types } from "mongoose";
import { IProject } from "../../domain/entities/Project";
import { IProjectRepository } from "../../domain/interface/IProjectRepository";
import { ProjectType } from "../../domain/types/projectSchema";
import { projectModel } from "../models/projectModels";

export class ProjectRepository implements IProjectRepository {
    async createProject(data: ProjectType): Promise<IProject> {
        const saveproject = await projectModel.create(data);
        return saveproject;
    }

    async getProjects(skip: number, limit:number): Promise<IProject[]> {
        const projects = await projectModel.find().skip(skip).limit(limit).sort({ createdAt: -1});
        return projects;
    }

    async countProjects(): Promise<number> {
         return await projectModel.countDocuments();
    }

    async deleteProject(id: Types.ObjectId) {
        return await projectModel.findByIdAndDelete(id)
    }

    async editProject(data: ProjectType, id: Types.ObjectId): Promise<IProject | null> {
        const updated = await projectModel.findByIdAndUpdate(id, data, {new: true})
        return updated;
    }
}