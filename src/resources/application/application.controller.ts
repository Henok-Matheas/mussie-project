import { Request, Response } from 'express';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { handleErrorResponse } from '../../helpers/errorHandle';
import { ApplicationService } from './application.service';

export default class ApplicationController {
    static async createApplication(req: Request, res: Response) {
        try {
            const user_id = res.locals.user._id;

            const { experience, bio, resume, project_id } = req.body;

            const application = await ApplicationService.createApplication({ user_id, experience, bio, resume, project_id });

            const data = {
                application: application
            }

            return new SuccessResponse('Application created successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async getApplicationsByProjectId(req: Request, res: Response) {
        try {
            const { projectId } = req.params;

            const applications = await ApplicationService.getApplicationsByProjectId({ projectId });

            const data = {
                applications: applications
            }

            return new SuccessResponse('Applications fetched successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async getApplicationById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const application = await ApplicationService.getApplicationById({ id });

            const data = {
                application: application
            }

            return new SuccessResponse('Application fetched successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async updateApplication(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { experience, bio, resume } = req.body;

            const application = await ApplicationService.updateApplication({ id, experience, bio, resume });

            const data = {
                application: application
            }

            return new SuccessResponse('Application updated successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async deleteApplication(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await ApplicationService.deleteApplication({ id });

            return new SuccessMsgResponse('Application deleted successfully').send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }
}