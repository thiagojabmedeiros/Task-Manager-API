import { Request, Response } from "express";
import AppError from "../utils/AppError";
import z from "zod";

import Team from "../models/Team";
import User from "../models/User";
import Task from "../models/Task";
import TeamMember from "../models/TeamMember";

class TaskController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string().min(3).max(200),
            description: z.string().nullish(),

            status: z.enum(["pending", "in_progress", "completed"]).default("pending"),

            priority: z.enum(["high", "medium", "low"]),

            asigned_to: z.uuid(),
            team_id: z.uuid()
        })
        const { title, description, status, priority, asigned_to, team_id } = bodySchema.parse(request.body)

        const user = await User.findOne({
            where: {
                id: asigned_to
            }
        })
        if (!user) {
            throw new AppError("user not found", 404)
        }
        
        const team = await Team.findOne({
            where: {
                id: team_id
            }
        })
        if (!team) {
            throw new AppError("team not found", 404)
        }

        const isFromTeam = await TeamMember.findOne({
            where: {
                user_id: asigned_to,
                team_id: team_id
            }
        })
        if (!isFromTeam) {
            throw new AppError("user is not member of this team")
        }

        const task = await Task.create({ title, description, status, priority, asigned_to, team_id })
        
        return response.status(201).json(task)
    }
    async index(request: Request, response: Response) {
        const tasks = await Task.findAll({
            attributes: ["title", "status", "priority"],
            include: [
                {
                    association: "team",
                    attributes: ["name"]
                },
                {
                    association: "user",
                    attributes: ["name", "role"]
                }
            ],
        })
        if (tasks.length === 0) {
            throw new AppError("no tasks asigned yet", 404)
        }
        return response.status(200).json(tasks)
    }

}

export default TaskController