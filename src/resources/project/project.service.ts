import { ProjectRepository } from "./project.repository";

export class ProjectService {
    static async createProject(url: string, country: string, start_year: number, end_year: number | undefined) {
        return await ProjectRepository.createProject(url, country, start_year, end_year);
    }

    static async getProjectsByCount(count: number) {
        return await ProjectRepository.getProjects(count);
    }
}