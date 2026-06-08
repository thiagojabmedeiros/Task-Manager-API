import TaskController from "../controllers/TaskController";
const taskController = new TaskController()

import { Router } from "express";
const taskRoutes = Router()

import ensureAuthenticate from "../middlewares/ensure-authenticate";

taskRoutes.use(ensureAuthenticate)

taskRoutes.post("/", taskController.create)
taskRoutes.get("/", taskController.read)
taskRoutes.patch("/:task_id", taskController.update)
taskRoutes.delete("/:task_id", taskController.delete)

export default taskRoutes