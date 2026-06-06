import UserController from "../controllers/UserController";
const userController = new UserController()

import { Router } from "express";
const userRoutes = Router()

userRoutes.get("/", userController.create)

export default userRoutes