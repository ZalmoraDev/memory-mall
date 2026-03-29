import {z} from 'zod';
import {insertBusinessAccountSchema, insertUserAccountSchema} from '../../db/schema.ts';

// region private
const accountFields = {
    email: true,
    phone: true,
    streetAddress: true,
    streetNumber: true,
    apartmentSuite: true,
    city: true,
    postalCode: true
} as const;

const minPasswordLength = 8;
// endregion private


// region public
// Whitelisting opposed to blacklisting, to negate accidental mass assigment / object injection
export const registerUserVal = insertUserAccountSchema.pick({
    ...accountFields, username: true, firstName: true, lastName: true
}).extend({
    email: z.email('Invalid email'),
    password: z.string().min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`)
});

export const registerBusinessVal = insertBusinessAccountSchema.pick({
    ...accountFields, name: true, description: true, vatNumber: true
}).extend({
    email: z.email('Invalid email'),
    password: z.string().min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`)
});

export const loginVal = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password is required').max(255, 'Password must be 8-255 characters')
});
// endregion public