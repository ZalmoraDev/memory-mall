import {z} from 'zod';
import {insertAccountSchema, insertBusinessSchema, insertUserSchema} from '../db/schema.ts';

export const registerUserVal = insertAccountSchema.extend({password: z.string().min(8, 'Password must be at least 8 characters')}).merge(insertUserSchema.omit({id: true}));
export const registerBusinessVal = insertAccountSchema.extend({password: z.string().min(8, 'Password must be at least 8 characters')}).merge(insertBusinessSchema.omit({id: true}));

export const loginVal = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password is required').max(255, 'Password must be 8-255 characters')
});