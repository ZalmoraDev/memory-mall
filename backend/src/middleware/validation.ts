import type {Request, Response, NextFunction, RequestHandler} from 'express';
import {ZodError} from 'zod';

// TODO: Refactor to by DRY, implement when I learned more about TS

/**
 * HoF Middleware to validate GET query parameters (req.params) against a given Zod schema.
 * @returns Inner middleware function that validates req.params and either:
 * - void, calling next()
 * - Response (400), validation failed */
export const validateParams = (zodSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            zodSchema.parse(req.params);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: 'Invalid parameters',
                    details: err.issues.map((zodErr) => ({
                        fields: zodErr.path.join('.'),
                        message: zodErr.message
                    }))
                });
            }
            next(err);
        }
    };
};

/**
 * Fail-fast Middleware to validate GET request query parameters (req.query) against a given Zod schema.
 * @returns Inner middleware function that validates req.query and either:
 * - void, calling next()
 * - Response (400), validation failed */
export const validateQuery = (zodSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            zodSchema.parse(req.query);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: 'Invalid query parameters',
                    details: err.issues.map((zodErr) => ({
                        fields: zodErr.path.join('.'),
                        message: zodErr.message
                    }))
                });
            }
            next(err);
        }
    };
};

/**
 * Fail-fast Middleware to validate REST request body (req.body) against a given Zod schema.
 * @returns Inner middleware function that validates req.body and either:
 * - void, calling next()
 * - Response (400), validation failed */
export const validateBody = (zodSchema): RequestHandler => {
    return (req, res, next) => {
        try {
            const validatedData = zodSchema.parse(req.body);
            req.body = validatedData; // Reassign, for if the schema changes any data of the body
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: 'Validation failed',
                    details: err.issues.map((zodErr) => ({
                        fields: zodErr.path.join('.'),
                        message: zodErr.message
                    }))
                });
            }
            next(err);
        }
    };
};