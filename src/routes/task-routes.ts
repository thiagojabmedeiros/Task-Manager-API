import TaskController from "../controllers/TaskController";
const taskController = new TaskController()

import { Router } from "express";
const taskRoutes = Router()

taskRoutes.post("/", taskController.create)
taskRoutes.get("/", taskController.index)

export default taskRoutes