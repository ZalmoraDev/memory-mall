import {Router} from 'express';
import authRoutes from './auth.routes.ts';
import {authenticateToken} from '../../middleware/auth.ts';
import type {Request, Response} from 'express';

// Collective router used for v1 API paths
const router = Router();

// Simple health check
router.get('/health', async(req: Request, res: Response): Promise<Response> => {
    return res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Memory Mall API v1'
    });
});
router.use('/auth', authRoutes); // Public

router.use(authenticateToken); // JWT required from here on out

export default router;