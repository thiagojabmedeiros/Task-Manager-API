import { Request, Response } from "express"
import { compare } from "bcrypt"
import z from "zod"


import AppError from "../utils/AppError"
import User from "../models/User"

class SessionController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email(),
            password: z.string()
        })
        const { email, password } = bodySchema.parse(request.body)

        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new AppError("invalid email or password", 401)
        }

        const pwd = await compare(password, user.toJSON().password)
        if (!pwd) {
            throw new AppError("invalid email or password", 401)
        }

        return response.status(201).json(user)
    }
}

export default SessionController