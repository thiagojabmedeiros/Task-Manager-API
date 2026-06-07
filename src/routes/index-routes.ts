import userRoutes from "./user-routes";
import sessionRoutes from "./session-routes";
import teamRoutes from "./team-routes";
import taskRoutes from "./task-routes";

import { Router } from "express";
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)
routes.use("/teams", teamRoutes)
routes.use("/tasks", taskRoutes)

export default routes