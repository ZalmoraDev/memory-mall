import type {Request, Response} from 'express';
import type {LoginResponse} from '@shared/api/auth.js';

import {createUser, createBusiness, loginAccount} from '../../services/authService.ts';

//region POST
/** POST /api/v1/register/user - Controller for handling user registration. Hashes password, creates user in DB, and returns account & JWT. */
// TODO: Give accurate response type that is shared, so the frontend knows the format
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await createUser(req.body);

        // TODO: Check if user needs to be returned or if that is already included in the account object
        return res.status(201).json({
            message: 'User created',
            account: result.account,
            token: result.token
        } satisfies {message: string} & LoginResponse);
    } catch (err) {
        console.error('Registration error: ', err);
        return res.status(500).json({error: 'Failed to create user'});
    }
};

/** POST /api/v1/register/business - Controller for handling business registration. Hashes password, creates business & account in DB, and returns account & JWT. */
// TODO: Give accurate response type that is shared, so the frontend knows the format
export const registerBusiness = async (req: Request, res: Response): Promise<Response> => {
    try {
        const result = await createBusiness(req.body);

        // TODO: Check if business needs to be returned or if that is already included in the account object
        return res.status(201).json({
            message: 'Business created',
            account: result.account,
            token: result.token
        } satisfies {message: string} & LoginResponse);
    } catch (err) {
        console.error('Registration error: ', err);
        return res.status(500).json({error: 'Failed to create business'});
    }
};

/** POST /api/v1/login - Controller for handling account login (users AND businesses). Validates credentials, generates JWT, and returns an account & token. */
// TODO: Give accurate response type that is shared, so the frontend knows the format
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body;
        const result = await loginAccount(email, password);

        return res.status(200).json({
            message: 'You\'ve successfully logged in',
            account: result.account,
            token: result.token
        } satisfies {message: string} & LoginResponse);
    } catch (err) {
        console.error('Login error: ', err);
        if (err instanceof Error && err.message === 'Invalid credentials')
            return res.status(401).json({error: 'Invalid credentials'});
        return res.status(500).json({error: 'Failed to log in'});
    }
};
//endregion POST
