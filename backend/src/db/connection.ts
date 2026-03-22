import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from 'pg';
import {remember} from '@epic-web/remember';

import * as schema from './schema.ts';
import {env, isProd} from '../../env.ts';

const createPool: Pool = () => {
    return new Pool({
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USERNAME,
        password: env.DB_PASSWORD,
        database: env.DB_DATABASE,
    });
};

let client: Pool;

// Testing/Dev have 'watching' enabled, so we want to reuse the same pool across reloads to avoid exhausting connections.
if (isProd())
    client = createPool();
else
    client = remember('dbPool', () => createPool()); // remember = singleton, remembers the pool across hot reloads

export const db = drizzle({client, schema});
export default db;