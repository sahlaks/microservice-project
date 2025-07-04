import { IProject } from "../entities/Project";
import { ProjectType } from "../types/projectSchema";

export interface IProjectRepository {
    createProject(data: ProjectType): Promise<IProject>
    getProjects(): Promise<IProject[]>
}