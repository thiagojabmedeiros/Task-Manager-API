import TeamController from "../controllers/TeamController";
const teamController = new TeamController()

import { Router } from "express";
const teamRoutes = Router()

teamRoutes.post("/", teamController.create)

export default teamRoutes