import { Router } from "express";
import { authenticate } from "../../middlewares/authentication";
import ProjectController from "./project.controller";

const projectRouter = Router();

projectRouter
    .route("/")
    .post(ProjectController.createProject)
    .get(authenticate, ProjectController.getProjectsByCount);

export default projectRouter;
