import type { Account, User, Business } from '../types';

export interface LoginResponse {
    account: Account;
    user?: User;
    business?: Business;
    token: string;
}

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
}