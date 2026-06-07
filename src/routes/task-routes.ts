import TaskController from "../controllers/TaskController";
const taskController = new TaskController()

import { Router } from "express";
const taskRoutes = Router()

taskRoutes.post("/", taskController.create)

export default taskRoutes