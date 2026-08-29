import type {Request, Response} from 'express';
import type {
    RegisterUserRequest,
    RegisterUserResponse,
    RegisterBusinessRequest,
    RegisterBusinessResponse,
    LoginRequest,
    LoginResponse
} from '@shared/contracts/auth.js';

import {createUser, createBusiness, loginAccount} from '../../services/auth.service.ts';

//#region POST
/** POST /api/v1/register/user - Controller for handling user registration. Hashes password, creates user in DB, and returns account & JWT. */
export const registerUser = async (req: Request, res: Response): Promise<Response<RegisterUserResponse>> => {
    try {
        const body = req.body as RegisterUserRequest;
        const result = await createUser(body);

        const response: RegisterUserResponse = {
            account: result.account,
            token: result.token
        };

        return res.status(201).json({
            message: 'User created',
            ...response
        });
    } catch (err) {
        console.error('Registration error: ', err);
        return res.status(500).json({error: 'Failed to create user'});
    }
};

/** POST /api/v1/register/business - Controller for handling business registration. Hashes password, creates business & account in DB, and returns account & JWT. */
export const registerBusiness = async (req: Request, res: Response): Promise<Response<RegisterBusinessResponse>> => {
    try {
        const body = req.body as RegisterBusinessRequest;
        const result = await createBusiness(body);

        const response: RegisterBusinessResponse = {
            account: result.account,
            token: result.token
        };

        return res.status(201).json({
            message: 'Business created',
            ...response
        });
    } catch (err) {
        console.error('Registration error: ', err);
        return res.status(500).json({error: 'Failed to create business'});
    }
};

/** POST /api/v1/login - Controller for handling account login (users AND businesses). Validates credentials, generates JWT, and returns an account & token. */
export const login = async (req: Request, res: Response): Promise<Response<LoginResponse>> => {
    try {
        const {email, password} = req.body as LoginRequest;
        const result = await loginAccount(email, password);

        const response: LoginResponse = {
            account: result.account,
            token: result.token
        };

        return res.status(200).json({
            message: 'You\'ve successfully logged in',
            ...response
        });
    } catch (err) {
        console.error('Login error: ', err);
        if (err instanceof Error && err.message === 'Invalid credentials')
            return res.status(401).json({error: 'Invalid credentials'});
        return res.status(500).json({error: 'Failed to log in'});
    }
};
//#endregion POST
