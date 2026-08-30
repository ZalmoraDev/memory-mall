import type {AccountPublic} from '../index';

// Re-export so consumers of the API contract can import the wire-safe account type
// from a single module rather than reaching into shared/types.
export type {AccountPublic};

//#region REQUESTS
export type {
    RegisterUserRequest,
    RegisterBusinessRequest,
    LoginRequest
} from '../../../backend/src/validators/v1/auth';
//#endregion REQUESTS


//#region RESPONSES
export interface RegisterUserResponse {
    account: AccountPublic;
    token: string;
}

export interface RegisterBusinessResponse {
    account: AccountPublic;
    token: string;
}

export interface LoginResponse {
    account: AccountPublic;
    token: string;
}
//#endregion RESPONSES
