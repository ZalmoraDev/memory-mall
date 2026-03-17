import {drizzle} from 'drizzle-orm/node-postgres';
import {Pool} from 'pg';
import {remember} from '@epic-web/remember';

import * as schema from './schema.ts';
import {env, isProd} from '../../env.ts';

const createPool: Pool = () => {
    return new Pool({
        connectionString: env.DB_HOST + ':' + env.DB_PORT
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