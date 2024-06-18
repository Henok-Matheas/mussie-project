import { Router } from "express";
import { authenticate } from "../../middlewares/authentication";
import {
  getUser,
  loginUser,
  registerUser
} from "./user.controllers";

const userRouter = Router();


userRouter.get("/user", authenticate, getUser);
userRouter.post("/login", loginUser);
userRouter.post("/signup", registerUser);

export default userRouter;
