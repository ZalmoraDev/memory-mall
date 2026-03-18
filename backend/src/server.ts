import express from 'express';
import authRoutes from './routes/authRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import habitRoutes from './routes/habitRoutes.ts';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import {env, isDev, isTest} from '../env.ts';
import {authenticateToken} from './middleware/auth.ts';
import {APIError, errorHandler} from './middleware/errorHandler.ts';

// Initialize Express app
const app = express();

// Global middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies

app.use(helmet()); // CSP
app.use(cors({origin: env.ALLOWED_ORIGINS, credentials: true})); // CORS
app.use(morgan('dev', {skip: () => isTest()})); // Logging to console

app.use(errorHandler); // Global error handler

// Simple health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Memory Mall API v1'
    });
});

// Route middleware
app.use('/api/auth', authRoutes); // Public
app.use(authenticateToken); // JWT required from here on

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

export {app};
export default app;