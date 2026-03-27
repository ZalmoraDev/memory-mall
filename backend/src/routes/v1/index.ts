import {Router} from 'express';
import authRoutes from './authRoutes.ts';
import {authenticateToken} from '../../middleware/auth.ts';

// Collective router used for v1 API paths
const router = Router();

// Simple health check
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Memory Mall API v1'
    });
});
router.use('/auth', authRoutes); // Public

router.use(authenticateToken); // JWT required from here on out

export default router;