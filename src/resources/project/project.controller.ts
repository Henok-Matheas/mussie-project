import { Request, Response } from 'express';
import { SuccessResponse } from '../../core/ApiResponse';
import { handleErrorResponse } from '../../helpers/errorHandle';
import { ProjectService } from './project.service';

export default class ProjectController {
    static async createProject(req: Request, res: Response) {
        try {
            const { url, country, start_year, end_year } = req.body;

            const flag = await ProjectService.createProject(url, country, parseInt(start_year), parseInt(end_year));

            const data = {
                flag: flag
            }

            return new SuccessResponse('Flag created successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }
    static async getProjectsByCount(req: Request, res: Response) {
        try {
            const count = req.query.count as string;

            const flags = await ProjectService.getProjectsByCount(count ? parseInt(count) : 4);

            const data = {
                flags: flags
            }

            return new SuccessResponse('Flags retrieved successfully', data).send(res);
        } catch (error) {
            handleErrorResponse(error, res);
        }
    }
}