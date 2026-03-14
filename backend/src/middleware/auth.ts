import type {Request, Response, NextFunction} from 'express';
import {verifyToken, type JwtPayload} from '../utils/jwt.ts';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

/** Middleware to authenticate JWT tokens in incoming requests. Checks for 'Authorization' header */
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Get second string after 'Bearer '

        if (!token)
            return res.status(401).json({error: 'Bad request'});

        const payload = await verifyToken(token);
        req.user = payload;

        next();
    } catch (err) {
        return res.status(403).json({error: 'Forbidden'});
    }
};