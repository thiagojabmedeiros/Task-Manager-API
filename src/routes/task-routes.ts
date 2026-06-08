import TaskController from "../controllers/TaskController";
const taskController = new TaskController()

import { Router } from "express";
const taskRoutes = Router()

import ensureAuthenticate from "../middlewares/ensure-authenticate";
import verifyAuthorization from "../middlewares/verify-authorization";

taskRoutes.use(ensureAuthenticate)

taskRoutes.post("/", verifyAuthorization(["admin"]),taskController.create)
taskRoutes.get("/", verifyAuthorization(["admin", "member"]),taskController.read)
taskRoutes.patch("/:task_id", verifyAuthorization(["admin", "member"]),taskController.update)
taskRoutes.delete("/:task_id", verifyAuthorization(["admin"]),taskController.delete)

export default taskRoutes