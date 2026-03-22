import {defineConfig} from 'drizzle-kit';
import {env} from './env.ts';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
        ssl: false
    },
    verbose: true,
    strict: true
});