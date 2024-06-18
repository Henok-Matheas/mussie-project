import { ProjectRepository } from "./project.repository";

export class ProjectService {
    static async createProject({ created_by, name, description, tech_stacks, specialization, duration, application_deadline, intake_number }) {
        return await ProjectRepository.createProject({ created_by, name, description, tech_stacks, specialization, duration, application_deadline, intake_number });
    }
    static async getProjects({ pageSize, pageNumber }) {
        return await ProjectRepository.getProjects({ pageSize, pageNumber });
    }

    static async getProjectById({ id }) {
        return await ProjectRepository.getProjectById({ id });
    }

    static async updateProject({ id, name, description, tech_stacks, specialization, duration, application_deadline, intake_number }) {
        return await ProjectRepository.updateProject({ id, name, description, tech_stacks, specialization, duration, application_deadline, intake_number });
    }

    static async deleteProject({ id }) {
        return await ProjectRepository.deleteProject({ id });
    }

}