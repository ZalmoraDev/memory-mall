import {z} from 'zod';

//#region private
// Shared address fields for both user & business registration
const accountFields = {
    email: z.email('Invalid email'),
    phone: z.string().max(15).optional(),
    streetAddress: z.string().max(128),
    streetNumber: z.string().max(16),
    apartmentSuite: z.string().max(32).optional(),
    city: z.string().max(128),
    postalCode: z.string().max(16)
};

const minPasswordLength = 8;
const passwordField = z.string().min(minPasswordLength, `Password must be at least ${minPasswordLength} characters`);
//#endregion private

//#region public
// Whitelisting opposed to blacklisting, to negate accidental mass assignment / object injection.
// These are the request DTOs; models live in @backend/src/db/schema.ts

// TODO: fields arent' finished, min needs revamp for example
export const registerUserVal = z.object({
    ...accountFields,
    username: z.string().min(1).max(32),
    firstName: z.string().min(1).max(64),
    lastName: z.string().min(1).max(64),
    password: passwordField
});

export const registerBusinessVal = z.object({
    ...accountFields,
    name: z.string().min(1).max(128),
    description: z.string().optional(),
    vatNumber: z.string().min(1).max(32),
    password: passwordField
});

export const loginVal = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password is required').max(255, 'Password must be 8-255 characters')
});

// Inferred request DTO types - re-exported by @shared/contracts/auth.ts so the wire
// contract's request shapes derive from the same source as the runtime validator
export type RegisterUserRequest = z.infer<typeof registerUserVal>;
export type RegisterBusinessRequest = z.infer<typeof registerBusinessVal>;
export type LoginRequest = z.infer<typeof loginVal>;
//#endregion public
