import type {Account, User, Business} from '../types';

// region REQUESTS

export interface RegisterUserRequest {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    streetAddress: string;
    streetNumber: string;
    apartmentSuite?: string;
    city: string;
    postalCode: string;
}

export interface RegisterBusinessRequest {
    name: string;
    description?: string;
    vatNumber: string;
    email: string;
    phone?: string;
    password: string;
    streetAddress: string;
    streetNumber: string;
    apartmentSuite?: string;
    city: string;
    postalCode: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
// endregion REQUESTS


// region RESPONSES

/** Account shape safe to expose over the wire: no password hash, no soft-delete marker. */
export interface PublicAccount {
    id: string;
    userId: string | null;
    businessId: string | null;
    email: string;
    phone: string | null;
    streetAddress: string;
    streetNumber: string;
    apartmentSuite: string | null;
    city: string;
    postalCode: string;
    createdAt: string;
}

export interface RegisterUserResponse {
    account: PublicAccount;
    token: string;
}

export interface RegisterBusinessResponse {
    account: PublicAccount;
    token: string;
}

export interface LoginResponse {
    account: PublicAccount;
    token: string;
}
// endregion RESPONSES