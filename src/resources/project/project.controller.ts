import { Request, Response } from 'express';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { handleErrorResponse } from '../../helpers/errorHandle';
import { ProjectService } from './project.service';

export default class ProjectController {

    static async createProject(req: Request, res: Response) {
        try {
            const { created_by } = res.locals.user._id;

            const { name, description, tech_stacks, specialization, duration, application_deadline, intake_number } = req.body;

            const project = await ProjectService.createProject({ created_by, name, description, tech_stacks, specialization, duration, application_deadline, intake_number });

            const data = {
                project: project
            }

            return new SuccessResponse('Project created successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async getProjects(req: Request, res: Response) {
        try {
            const { pageSize, pageNumber } = req.query;

            const validPageSize = isNaN(parseInt(pageSize as string)) ? parseInt(pageSize as string) : 20;
            const validPageNumber = isNaN(parseInt(pageNumber as string)) ? parseInt(pageNumber as string) : 1;


            const projects = await ProjectService.getProjects({ pageSize: validPageSize, pageNumber: validPageNumber });

            const data = {
                projects: projects
            }

            return new SuccessResponse('Projects fetched successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async getProjectById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const project = await ProjectService.getProjectById({ id });

            const data = {
                project: project
            }

            return new SuccessResponse('Project fetched successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async updateProject(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, tech_stacks, specialization, duration, application_deadline, intake_number } = req.body;

            const project = await ProjectService.updateProject({ id, name, description, tech_stacks, specialization, duration, application_deadline, intake_number });

            const data = {
                project: project
            }

            return new SuccessResponse('Project updated successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }

    static async deleteProject(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await ProjectService.deleteProject({ id });

            return new SuccessMsgResponse('Project deleted successfully').send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }
}