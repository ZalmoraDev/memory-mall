// Validates and loads environment variables
import {env as loadEnv} from 'custom-env';
import {z} from 'zod';

process.env.APP_STAGE = process.env.APP_STAGE || 'dev';
const isProduction: boolean = process.env.APP_STAGE === 'production'; // Injected by Docker/Jenkins
const isDevelopment: boolean = process.env.APP_STAGE === 'dev';
const isTesting: boolean = process.env.APP_STAGE === 'test';

if (isDevelopment)
    loadEnv();
else if (isTesting)
    loadEnv('test');

// Set zod schema
const envSchema = z.object({
    // Node environment
    BE_NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    APP_STAGE: z.enum(['dev', 'test', 'production']).default('dev'),

    // Back-end
    BE_HOST: z.string().default('localhost'),
    BE_PORT: z.coerce.number().positive(),

    // Database
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.coerce.number().positive(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
    DATABASE_POOL_MIN: z.coerce.number().min(0).default(2),
    DATABASE_POOL_MAX: z.coerce.number().positive().default(10),

    // JWT & Auth
    BE_JWT_SECRET: z.string().min(32, 'BE_JWT_SECRET must be at least 32 characters'),
    BE_JWT_EXPIRES_IN: z.string().default('7d'),
    REFRESH_TOKEN_SECRET: z.string().min(32).optional(),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),

    // Security
    BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),

    // CORS
    ALLOWED_ORIGINS: z
        .string()
        .or(z.array(z.string()))
        .transform((val) => {
            if (typeof val === 'string')
                return val.split(',').map((origin) => origin.trim());
            return val;
        })
        .default([]),

    // Logging
    BE_LOG_LEVEL: z
        .enum(['error', 'warn', 'info', 'debug', 'trace'])
        .default(isProduction ? 'info' : 'debug'),
});

export type Env = z.infer<typeof envSchema>;
let env: Env;

// Validate schema and set env vars
try {
    env = envSchema.parse(process.env);
} catch (e) {
    if (e instanceof z.ZodError) {
        console.log('Invalid env var');
        console.error(JSON.stringify(e.flatten().fieldErrors, null, 2));

        e.issues.forEach((err): void => {
            const path: string = err.path.join('.');
            console.log(`${path}: ${err.message}`);
        });

        process.exit(1);
    }
    throw e;
}

// Helper functions for environment checks
export const isProd = () => env.APP_STAGE === 'production';
export const isDev = () => env.APP_STAGE === 'dev';
export const isTest = () => env.APP_STAGE === 'test';

export {env};
export default env;