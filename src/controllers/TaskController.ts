import { Request, Response } from "express";
import AppError from "../utils/AppError";
import z from "zod";

import Team from "../models/Team";
import User from "../models/User";

class TaskController {
    async create(request: Request, response: Response) {
        // return response.status(201).json({ message: "ok" })
    }
}

export default TaskController