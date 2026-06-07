import userRoutes from "./user-routes";
import sessionRoutes from "./session-routes";
import teamRoutes from "./team-routes";

import { Router } from "express";
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/teams", teamRoutes)
routes.use("/sessions", sessionRoutes)

export default routes