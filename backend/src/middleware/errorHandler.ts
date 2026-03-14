import type {NextFunction, Request, Response} from 'express';
import env from '../../env.ts';

/** Custom error class for API errors. */
export class APIError extends Error {
    status: number;
    name: string; // TODO: Replace with enum
    message: string;

    constructor(message: string, name: string, status: number) {
        super();
        this.message = message;
        this.name = name;
        this.status = status;
    }
}

/** Middleware for handling errors in Express routes. */
export const errorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    // Default error
    let status = err.status || 500
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        status = 400;
        message = 'Validation Error';
    }

    if (err.name === 'UnauthorizedError') {
        status = 401;
        message = 'Unauthorized';
    }

    res.status(status).json({
        error: message,
        ...(env.APP_STAGE === 'dev' && {
            stack: err.stack,
            details: err.message
        })
    })
};