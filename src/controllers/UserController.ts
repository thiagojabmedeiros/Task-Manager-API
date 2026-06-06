import { Request, Response } from "express";
import { hash } from "bcrypt"
import z from "zod";

import User from "../models/User";

class UserController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().min(3),
            role: z.enum(["admin", "member"]).default("member").nullish(),
            email: z.email(),
            password: z.string().min(6)
        })

        const { name, role, email, password } = bodySchema.parse(request.body)

        const hashedPassword = await hash(password, 8)

        const user = await User.create({ name, role, email, password: hashedPassword })

        const { password: _, ...userWithoutPassword } = user.toJSON()

        return response.status(201).json(userWithoutPassword)
    }
}

export default UserController