import { Router } from "express";
import { authenticate } from "../../middlewares/authentication";
import ApplicationController from "./application.controller";

const applicationRouter = Router();

applicationRouter
    .route("/")
    .post(authenticate, ApplicationController.createApplication)

applicationRouter
    .route("/project/:projectId")
    .get(ApplicationController.getApplicationsByProjectId);

applicationRouter
    .route("/:id")
    .get(authenticate, ApplicationController.getApplicationById)
    .put(authenticate, ApplicationController.updateApplication)
    .delete(authenticate, ApplicationController.deleteApplication);

export default applicationRouter;
