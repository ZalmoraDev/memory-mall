import bcrypt from 'bcrypt';
import env from '../../env.ts';

/** Hashes plaintext password using bcrypt with specified salt rounds from env
 * @returns String: hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, env.BCRYPT_ROUNDS);
};

/** Compares plaintext against hashed password
 * @returns Boolean: true matching, false not matching */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};