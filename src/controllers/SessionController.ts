import { Request, Response } from "express"
import z from "zod"

import AppError from "../utils/AppError"
import User from "../models/User"

class SessionController {
    async create(request: Request, response: Response) {
        return response.status(201).json({ message: "ok!"})
    }
}

export default SessionController