import { Response } from 'express';

export const sendError = (
    res: Response,
    message: string,
    err: unknown,
    statusCode: number = 400
): void => {
    const error = err as { name?: string; errors?: unknown };
    res.status(statusCode).json({
        message,
        success: false,
        error: {
            name: error?.name,
            errors: error?.errors
        }
    });
};
