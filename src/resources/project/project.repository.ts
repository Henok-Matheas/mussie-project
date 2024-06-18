import { ProjectModel } from './project.model';

export class ProjectRepository {
    static async createProject(url: string, country: string, start_year: number, end_year: number | undefined) {
        return await ProjectModel.create({ url, country, start_year, end_year });
    }

    static async getProjects(count: number) {
        return await ProjectModel.aggregate([{ $sample: { size: count } }]);
    }
}