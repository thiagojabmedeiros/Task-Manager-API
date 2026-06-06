import SessionController from "../controllers/SessionController";
const sessionController = new SessionController()

import { Router } from "express";
const sessionRoutes = Router()

sessionRoutes.post("/", sessionController.create)

export default sessionRoutes