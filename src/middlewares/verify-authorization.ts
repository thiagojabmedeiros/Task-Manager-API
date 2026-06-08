import { Request, Response, NextFunction } from "express"
import AppError from "../utils/AppError"

function verifyAuthorization(role: string[]) {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new AppError("invalid token", 401)
        }
        if (!role.includes(request.user.role)) {
            throw new AppError("invalid tokenx", 401)
        }
        return next()
    }
}

export default verifyAuthorization