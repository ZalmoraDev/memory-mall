import {db} from '../../src/db/connection.ts';
import {users, habits, entries, tags, habitTags} from '../../src/db/schema.ts';
import {sql} from 'drizzle-orm';
import {execSync} from 'child_process';


export default async function setup() {
    console.log('💾 Setting up db');
    try {
        // DROP all tables
        await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
        await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`);

        // Enter tsx CLI commands for telling drizzle-kit to execute our schema
        console.log('🚀 Pushing schema using drizzle-kit...');
        execSync(
            `npx drizzle-kit push \
            --url="${process.env.DB_HOST + ':' + process.env.DB_PORT}" \
            --schema="./src/db/schema.ts" \
            --dialect="postgresql"`,
            {
                stdio: 'inherit',
                cwd: process.cwd(),
            }
        );

        console.log('✅ Test db setup complete');
    } catch (err) {
        console.error('❌ Failed to setup test db:', err);
        throw err;
    }

    // Eventhough at setup we drop all tables, we do so here to ensure no other db testing code runs into problems running their testing suite
    return async () => {
        console.log('🧹 Tearing down test db...');

        try {
            // Final cleanup - DROP all test data
            await db.execute(sql`DROP TABLE IF EXISTS ${entries} CASCADE`);
            await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
            await db.execute(sql`DROP TABLE IF EXISTS ${users} CASCADE`);
            await db.execute(sql`DROP TABLE IF EXISTS ${habits} CASCADE`);
            await db.execute(sql`DROP TABLE IF EXISTS ${habitTags} CASCADE`);

            console.log('✅ Test db teardown complete');
            process.exit(0);
        } catch (error) {
            console.error('❌ Failed to teardown test db:', error);
        }
    };
}