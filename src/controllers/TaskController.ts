import { Request, Response } from "express";
import AppError from "../utils/AppError";
import z from "zod";

import Team from "../models/Team";
import User from "../models/User";
import Task from "../models/Task";
import TeamMember from "../models/TeamMember";
import TaskHistory from "../models/TaskHistory";

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
    async read(request: Request, response: Response) {
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
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            task_id: z.uuid()
        })
        const { task_id } = paramsSchema.parse(request.params)

        const task = await Task.findOne({
            where: {
                id: task_id
            }
        })
        if (!task) {
            throw new AppError("task not found", 404)
        }

        const bodySchema = z.object({
            new_status: z.enum(["pending", "in_progress", "completed"])
        })
        const { new_status } = bodySchema.parse(request.body)

        const { task_id: id, status } = task.toJSON()
        
        if (!request.user) {
            throw new AppError("to make a change you need to be logged")
        }

        await task.update({ status: new_status })

        const taskHistory = await TaskHistory.create({ changed_by: request.user.id, task_id: task_id, new_status: new_status, old_status: status })

        return response.status(201).json(taskHistory)
    }
    async delete(request: Request, response: Response) {
        const paramsSchema = z.object({
            task_id: z.uuid()
        })
        const { task_id } = paramsSchema.parse(request.params)
        const task = await Task.findByPk(task_id)
        if (!task) {
            throw new AppError("task does not exist", 400)
        }
        await task.destroy()
        return response.status(200).json({ message: "task removed" })
    }
}

export default TaskController