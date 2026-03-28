import type {Request, Response} from 'express';
import {createUser, createBusiness, loginAccount} from '../../services/authService.ts';

//region POST
/** POST /api/v1/register/user - Controller for handling user registration. Hashes password, creates user in DB, and returns user & JWT.*/
export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = await createUser(req.body);

        return res.status(201).json({
            message: 'User created',
            account: result.account,
            token: result.token
        });
    } catch (err) {
        console.log('Registration error: ', err);
        res.status(500).json({error: 'Failed to create user'});
    }
};

/**  POST /api/v1/register/user - Controller for handling business registration. Hashes password, creates user in DB, and returns user & JWT.*/
export const registerBusiness = async (req: Request, res: Response) => {
    try {
        const result = await createBusiness(req.body);

        return res.status(201).json({
            message: 'Business created',
            account: result.account,
            token: result.token
        });
    } catch (err) {
        console.log('Registration error: ', err);
        res.status(500).json({error: 'Failed to create business'});
    }
};

/** POST /api/v1/login - Controller for handling user login. Validates credentials, generates JWT, and returns user & token. */
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const result = await loginAccount(email, password);

        return res.status(200).json({
            message: 'Account logged in',
            account: result.account,
            token: result.token
        });
    } catch (err) {
        console.log('Login error: ', err);
        if (err.message === 'Invalid credentials') // TODO: Rework error handling logic
            return res.status(401).json({error: 'Invalid credentials'});
        res.status(500).json({error: 'Failed to log in'});
    }
};
//endregion POST
