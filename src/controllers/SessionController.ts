import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"
import z from "zod"


import authConfig from "../configs/auth-config"
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
            },
            attributes: ["id", "name", "role", "email", "password"]
        })
        if (!user) {
            throw new AppError("invalid email or password", 401)
        }

        const pwd = await compare(password, user.toJSON().password)
        if (!pwd) {
            throw new AppError("invalid email or password", 401)
        }

        const token = await sign({ 
            id: user.toJSON().id, role: user.toJSON().role },
            authConfig.jwt.secret,
            {
                expiresIn: authConfig.jwt.expiresIn
            }
        )

        const { password: _, ...userWithoutPassword } = user.toJSON()

        return response.status(201).json({
            token: token,
            user: userWithoutPassword
        })
    }
}

export default SessionController