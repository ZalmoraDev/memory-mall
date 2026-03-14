import {type JWTPayload, jwtVerify, SignJWT} from 'jose';
import {createSecretKey} from 'node:crypto';
import env from '../../env.ts';

/** Extends `JWTPayload` to remain compatible with `jose`'s `SignJWT`,
 * which requires the base payload type with an index signature for arbitrary JWT claims. */
export interface JwtPayload extends JWTPayload {
    id: number;
    email: string;
    username: string;
}

/** Generates JWT token with given `JwtPayload`, signed using HS256 algorithm and secret key from `.env` */
export const generateToken = (payload: JwtPayload): Promise<string> => {
    const secret = env.JWT_SECRET;
    const secretKey = createSecretKey(secret, 'utf-8');

    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN || '7d')
        .sign(secretKey);
};

/** Verifies JWT token using secret key from `.env`. If valid, returns decoded `JwtPayload` */
export const verifyToken = async (token: string): Promise<JwtPayload> => {
    const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8');
    const {payload} = await jwtVerify(token, secretKey);

    return {
        id: payload.id as number,
        email: payload.email as string,
        username: payload.username as string
    };
};