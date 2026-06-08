import TeamController from "../controllers/TeamController";
const teamController = new TeamController()

import { Router } from "express";
const teamRoutes = Router()

import ensureAuthenticate from "../middlewares/ensure-authenticate";
import verifyAuthorization from "../middlewares/verify-authorization";

teamRoutes.use(ensureAuthenticate, verifyAuthorization(["admin"]))

teamRoutes.post("/", teamController.create)
teamRoutes.post("/:teamName", teamController.addMember)

export default teamRoutes