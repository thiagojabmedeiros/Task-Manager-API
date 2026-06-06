import userRoutes from "./user-routes";
import sessionRoutes from "./session-routes";

import { Router } from "express";
const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sessionRoutes)

export default routes