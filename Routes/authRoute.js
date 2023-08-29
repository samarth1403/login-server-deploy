import express from "express";
import {
  createUserController,
  getAUserController,
  loginUserController,
  updateAUserController,
} from "../Controllers/authControllers.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register-user", createUserController);
authRouter.post("/login-user", loginUserController);
authRouter.get("/get", authMiddleware, getAUserController);
authRouter.put("/update-user-profile", authMiddleware, updateAUserController);

export default authRouter;
