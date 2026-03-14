import type {Request, Response} from 'express';
import bcrypt, {compare} from 'bcrypt';

import {db} from '../db/connection.ts';
import {users, type NewUser, type User} from '../db/schema.ts';

import {generateToken} from '../utils/jwt.ts';
import {hashPassword, comparePasswords} from '../utils/passwords.ts';
import {eq} from 'drizzle-orm';

/** Controller for handling user registration. Hashes password, creates user in DB, and returns user & JWT.*/
export const register = async (req: Request, res: Response) => {
    try {
        // 1) Retrieve (destructured) fields user sends in the req body & hash the password
        const {email, password, firstName, lastName, username}: NewUser = req.body;
        const hashedPassword = await hashPassword(password);

        // 2) Attempt inserting new user into DB & return the created user
        const [user] = await db.insert(users).values({
            ...req.body,
            password: hashedPassword,
        }).returning({
            id: users.id,
            email: users.email,
            username: users.username,
            firstName: users.firstName,
            lastName: users.lastName,
            createdAt: users.createdAt
        });

        // 3) Generate JWT
        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.username
        });

        // 4) Send SUCCESS res with user data & token
        return res.status(201).json({
            message: 'User created',
            user,
            token
        });
    } catch (err) {
        console.log('Registration error: ', err);
        res.status(500).json({error: 'Failed to create user'});
    }
};

/** Controller for handling user login. Validates credentials, generates JWT, and returns user & token. */
export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        // 1) Find user by email
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (!user)
            return res.status(401).json({error: 'Invalid credentials'});

        // 2) Verify password
        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword)
            return res.status(401).json({error: 'Invalid credentials'});

        // 3) Generate JWT
        const token = await generateToken({
            id: user.id,
            email: user.email,
            username: user.username
        });

        // 4) Send SUCCESS res with user data & token
        return res.status(200).json({
            message: 'User logged in',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            },
            token
        });
    } catch (err) {
        console.log('Login error: ', err);
        res.status(500).json({error: 'Failed to log in'});
    }
};