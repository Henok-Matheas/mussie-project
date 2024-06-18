import { Router } from "express";
import { authenticate, permit } from "../../middlewares/authentication";
import { UserRole } from "../../types/user";
import ProjectController from "./project.controller";

const projectRouter = Router();

projectRouter
    .route("/")
    .post(authenticate, permit(UserRole.admin), ProjectController.createProject)
    .get(authenticate, ProjectController.getProjects);

projectRouter
    .route("/:id")
    .get(ProjectController.getProjectById)
    .put(authenticate, permit(UserRole.admin), ProjectController.updateProject)
    .delete(authenticate, permit(UserRole.admin), ProjectController.deleteProject);

export default projectRouter;
