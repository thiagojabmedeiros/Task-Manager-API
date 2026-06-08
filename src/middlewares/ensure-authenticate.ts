import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import authConfig from "../configs/auth-config";
import { verify } from "jsonwebtoken";

interface TokenPayLoad {
    role: string
    id: string
}

function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        throw new AppError("token not provided", 401)
    }
    const [, token] = authHeader.split(" ")

    try {
        const { id, role } = verify(token as string, authConfig.jwt.secret) as TokenPayLoad
        
        request.user = {
            id: id,
            role: role
        }

        return next()
    } catch (error) {
        return response.status(401).json("invalid token")
    }

}

export default ensureAuthenticate