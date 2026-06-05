import dotenv from "dotenv"
dotenv.config()

import z from "zod"

const envSchema = z.object({
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    JWT_SECRET: z.string()
})

const env = envSchema.parse(process.env)

export default env