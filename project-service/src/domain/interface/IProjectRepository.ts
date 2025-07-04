import { Types } from "mongoose";
import { IProject } from "../entities/Project";
import { ProjectType } from "../types/projectSchema";

export interface IProjectRepository {
    createProject(data: ProjectType): Promise<IProject>
    getProjects(skip: number, limit: number): Promise<IProject[]>
    countProjects(): Promise<number>
    deleteProject(id: Types.ObjectId): Promise<any | null>
    editProject(data: ProjectType, id: Types.ObjectId): Promise<IProject | null>
}