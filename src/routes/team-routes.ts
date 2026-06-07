import TeamController from "../controllers/TeamController";
const teamController = new TeamController()

import { Router } from "express";
const teamRoutes = Router()

teamRoutes.post("/", teamController.create)
teamRoutes.post("/:teamName", teamController.addMember)

export default teamRoutes