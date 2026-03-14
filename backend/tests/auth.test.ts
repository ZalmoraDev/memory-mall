import request from 'supertest';
import app from '../src/server.ts';
import env from '../env.ts';
import {createTestUser, createTestHabit, cleanupDatabase} from './setup/dbHelpers.ts';

describe('Authentication Endpoints', () => {
    afterEach(async () => {
        await cleanupDatabase();
    });
    describe('POST /api/auth/register', () => {
        it('should register a new user with valid data', async () => {
            const userData = {
                email: `test-${Date.now()}@example.com`,
                username: `testuser-${Date.now()}`,
                password: 'TestPassword123!'
            };

            const res = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).not.toHaveProperty('password');
        });
    });
    describe('POST /api/auth/login', () => {
        it('should login with valid credentials', async () => {
            const userData = await createTestUser();

            const credentials = {
                email: userData.user.email,
                password: userData.rawPassword
            };

            const res = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200);

            expect(res.body).toHaveProperty('user');
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).not.toHaveProperty('password');
        });
    });
});