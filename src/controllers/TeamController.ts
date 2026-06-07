import { Request, Response } from "express";
import z from "zod"
import AppError from "../utils/AppError";

import Team from "../models/Team";
import User from "../models/User";

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

        const team = await Team.create({ name, description })

        return response.status(201).json(team)
    }

    async addMember(request: Request, response: Response) {
        const paramsSchema = z.object({
            teamName: z.string().min(3)
        })
        const { teamName } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
            user_id: z.uuid(),
        })
        const { user_id } = bodySchema.parse(request.body)

        const [ team ] = await Team.findOrCreate({
            where: {
                name: teamName
            }
        })

        const user = await User.findByPk(user_id)
        if (!user) {
            throw new AppError("user does not exist", 404)
        }

        await team.addUsers([user])

        return response.status(202).json({ message: "user added to team" })
    }
}

export default TeamController