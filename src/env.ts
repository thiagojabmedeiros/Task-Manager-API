import dotenv from "dotenv"
dotenv.config()

import z from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),

    JWT_SECRET: z.string()
})

const env = envSchema.parse(process.env)

export default env