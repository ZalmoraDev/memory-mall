import {createTestUser, createTestHabit, cleanupDatabase} from './dbHelpers.ts';

describe('Test setup', () => {
    test('should connect to test DB', async () => {
        const {user, token} = await createTestUser();

        expect(user).toBeDefined();
        await cleanupDatabase();
    });
});