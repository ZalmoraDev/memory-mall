import {db} from '../../src/db/connection.ts';
import {users, habits, entries, habitTags, tags} from '../../src/db/schema.ts';
import {generateToken} from '../../src/utils/jwt.ts';
import {hashPassword} from '../../src/utils/passwords.ts';

import type {NewUser, NewHabit} from '../../src/db/schema.ts';

// Because we enforce max length field constraints in our DB and Zod, for email & username
// the name would get too long with just Math.random() + Date.now(), so we add random 4 digits instead
const randomFourDigits = () => Math.floor(1000 + Math.random() * 9000);

/** Helper function to create test user in the db and return the user object alongside JWT for auth */
export const createTestUser = async (userData: Partial<NewUser> = {}) => {
    // Create user using 'raw' given data at signup
    const defaultData = {
        email: `test-${Date.now()}-${randomFourDigits()}@example.com`,
        username: `testuser-${Date.now()}-${randomFourDigits()}`,
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        ...userData
    };

    // Hash raw password with same hashing function as in prod
    const hashedPassword = await hashPassword(defaultData.password);
    const [user] = await db
        .insert(users)
        .values({
            ...defaultData,
            password: hashedPassword
        })
        .returning();

    // Generate JWT
    const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.username,
    });

    return {token, user, rawPassword: defaultData.password};
};


/** Helper function to create test habit in the db for a given user UUID and return the habit object */
export const createTestHabit = async (userId: string, habitData: Partial<NewHabit> = {}) => {
    // Create habit
    const defaultData = {
        name: `Test habit ${Date.now()}}`,
        user: `A test habit`,
        frequency: 'daily',
        targetCount: 'Test',
        ...habitData
    };

    const [habit] = await db
        .insert(habits)
        .values({
            userId,
            ...defaultData,
        })
        .returning();

    return habit;
};


/** Helper function to clean up all test data from the db after each test. */
export const cleanupDatabase = async () => {
    await db.delete(entries);
    await db.delete(habits);
    await db.delete(users);
    await db.delete(tags);
    await db.delete(habitTags);
};