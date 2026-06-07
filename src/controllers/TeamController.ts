import { Request, Response } from "express";
import z from "zod"
import AppError from "../utils/AppError";

import User from "../models/User";
import Team from "../models/Team";
import { th } from "zod/locales";

class TeamController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3),
            description: z.string().nullish()
        })
        const { name, description } = bodySchema.parse(request.body)
        const exists = await Team.findOne({
            where: {
                name: name
            }
        })
        if (exists) {
            throw new AppError("there is another team with the same name")
        }
        return response.status(201).json({ message: "ok!" })
    }
}

export default TeamController