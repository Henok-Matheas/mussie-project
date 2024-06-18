import { ApplicationModel } from './application.model';


export class ApplicationRepository {
    static async createApplication({ user_id, experience, bio, resume, project_id }) {
        return await ApplicationModel.create({ user: user_id, experience, bio, resume, project: project_id });
    }

    static async getApplicationsByProjectId({ projectId }) {
        return await ApplicationModel.find({ project: projectId });
    }

    static async getApplicationById({ id }) {
        return await ApplicationModel.findById(id);
    }

    static async updateApplication({ id, experience, bio, resume }) {
        return await ApplicationModel.findByIdAndUpdate(id, { experience, bio, resume }, { new: true });
    }

    static async deleteApplication({ id }) {
        return await ApplicationModel.findByIdAndDelete(id);
    }

}