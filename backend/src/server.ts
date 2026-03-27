import express from 'express';
import v1Routes from './routes/v1/index.ts';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import {env, isDev, isTest} from '../env.ts';
import {APIError, errorHandler} from './middleware/errorHandler.ts';

// Initialize Express app
const app = express();

// Global middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded bodies

app.use(helmet()); // CSP
app.use(cors({origin: env.ALLOWED_ORIGINS, credentials: true})); // CORS
app.use(morgan('dev', {skip: () => isTest()})); // Logging to console

// Version-specific routes
app.use('/api/v1', v1Routes);

app.use(errorHandler); // Global error handler

export {app};
export default app;