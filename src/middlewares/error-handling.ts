import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import z from "zod";

function errorHandling(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }
    
    if (error instanceof z.ZodError) {
        return response.status(400).json({
            message: "validation error",
            issues: z.prettifyError(error)
        })
    }

    if (error instanceof Error) {
        return response.status(500).json({
            message: error.message
        })
    }

    return response.status(500).json({
        message: "internal server error"
    })
}

export default errorHandling