import {defineConfig} from 'drizzle-kit';
import {env} from './env.ts';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DB_HOST + ':' + env.DB_PORT
    },
    verbose: true,
    strict: true
});