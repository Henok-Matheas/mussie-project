import { ApplicationRepository } from "./application.repository";

export class ApplicationService {
    static async createApplication({ user_id, experience, bio, resume, project_id }) {
        return await ApplicationRepository.createApplication({ user_id, experience, bio, resume, project_id });
    }

    static async getApplicationsByProjectId({ projectId }) {
        return await ApplicationRepository.getApplicationsByProjectId({ projectId });
    }

    static async getApplicationById({ id }) {
        return await ApplicationRepository.getApplicationById({ id });
    }

    static async updateApplication({ id, experience, bio, resume }) {
        return await ApplicationRepository.updateApplication({ id, experience, bio, resume });
    }

    static async deleteApplication({ id }) {
        return await ApplicationRepository.deleteApplication({ id });
    }
}