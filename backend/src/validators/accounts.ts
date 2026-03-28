import {z} from 'zod';
import {insertBusinessAccountSchema, insertUserAccountSchema} from '../db/schema.ts';

const minPasswordLength: number = 8;

export const registerUserVal = insertUserAccountSchema.extend({
    password: z.string().min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`)
});

export const registerBusinessVal = insertBusinessAccountSchema.extend({
    password: z.string().min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`)
});

export const loginVal = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password is required').max(255, 'Password must be 8-255 characters')
});