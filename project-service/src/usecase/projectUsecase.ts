import { InternalServerError } from "../constants/customErrors";
import { PROJECT } from "../constants/messages";
import { IProjectRepository } from "../domain/interface/IProjectRepository";
import { ProjectType } from "../domain/types/projectSchema";

export class ProjectUseCase {
    constructor(private projectRepository: IProjectRepository){}

    async createProject(validatedData: ProjectType) {
        const project = await this.projectRepository.createProject(validatedData)
        if(!project){
             throw new InternalServerError("Failed to create project");
        }
        return {status: true, data: project, message:PROJECT.PROJECT_CREATED }  
    }

    async fetchAllProjects() {
        const projects = await this.projectRepository.getProjects();
        if(!projects) {
            throw new InternalServerError("Failed to fetch projects")
        }
        return {status: true, data: projects, message: PROJECT.ALL_FETCHED}
    }
}