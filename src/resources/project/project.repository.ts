import { ProjectModel } from './project.model';

export class ProjectRepository {

    static async createProject({ created_by, name, description, tech_stacks, specialization, duration, application_deadline, intake_number }) {
        return await ProjectModel.create({ created_by, name, description, tech_stacks, specialization, duration, application_deadline, intake_number });
    }

    static async getProjects({ pageSize, pageNumber }) {
        return await ProjectModel.find().skip(pageSize * (pageNumber - 1)).limit(pageSize);
    }

    static async getProjectById({ id }) {
        return await ProjectModel.findById(id);
    }

    static async updateProject({ id, name, description, tech_stacks, specialization, duration, application_deadline, intake_number }) {
        return await ProjectModel.findByIdAndUpdate(id, { name, description, tech_stacks, specialization, duration, application_deadline, intake_number }, { new: true });
    }

    static async deleteProject({ id }) {
        return await ProjectModel.findByIdAndDelete(id);
    }
}