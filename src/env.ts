import dotenv from "dotenv"
dotenv.config()

import z from "zod"

const envSchema = z.object({
    DB_URL: z.url(),
    
    PORT: z.coerce.number().default(3000),

    JWT_SECRET: z.string()
})

const env = envSchema.parse(process.env)

export default env