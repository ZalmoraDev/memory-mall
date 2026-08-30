import type {
    RegisterUserRequest,
    RegisterUserResponse,
    RegisterBusinessRequest,
    RegisterBusinessResponse,
    LoginRequest,
    LoginResponse
} from '@memory-mall/shared';

/** Server response wraps the contract payload with a human-readable message. */
type AuthResponse<T> = T & { message: string };

/**
 * Auth composable - exposes imperative functions for registration and login.
 * Uses `$fetch` (not `useFetch`) because these are user-initiated mutations,
 * not SSR-friendly data fetches that should auto-resolve on mount.
 */
export const useAuth = () => {
    const {public: {apiBase}} = useRuntimeConfig();

    const registerUser = (body: RegisterUserRequest) =>
        $fetch<AuthResponse<RegisterUserResponse>>('/register/user', {
            baseURL: apiBase,
            method: 'POST',
            body,
        });

    const registerBusiness = (body: RegisterBusinessRequest) =>
        $fetch<AuthResponse<RegisterBusinessResponse>>('/register/business', {
            baseURL: apiBase,
            method: 'POST',
            body,
        });

    const login = (body: LoginRequest) =>
        $fetch<AuthResponse<LoginResponse>>('/login', {
            baseURL: apiBase,
            method: 'POST',
            body,
        });

    return {registerUser, registerBusiness, login};
};
