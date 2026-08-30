import {eq} from 'drizzle-orm';
import {db} from '../db/connection.ts';
import {users, businesses, accounts, type Account, type User, type Business} from '../db/schema.ts';
import {generateToken} from '../utils/jwt.ts';
import {hashPassword, comparePasswords} from '../utils/passwords.ts';
import type {RegisterBusinessRequest, RegisterUserRequest} from '@shared/src/contracts/auth.contracts.ts';

//#region PRIVATE
/** Account row with its `user`/`business` owner relation resolved. */
type AccountWithOwner = Account & {
    user: User | null;
    business: Business | null;
};
//#endregion PRIVATE


//#region PUBLIC
/** Service handling user registration. Hashes password, creates user in DB, and returns account & JWT. */
export const createUser = async (body: RegisterUserRequest): Promise<any> => {
    // 1) Destructure controller req.body & hash the password
    const {
        username, firstName, lastName, email, phone, password,
        streetAddress, streetNumber, apartmentSuite, city, postalCode
    } = body;
    const hashedPassword = await hashPassword(password);

    // 2) Create user & account
    const {user, account} = await db.transaction(async (tx) => {
        const [user] = await tx.insert(users).values({
            username,
            firstName,
            lastName
        }).returning({
            id: users.id,
            username: users.username,
            firstName: users.firstName,
            lastName: users.lastName
        });

        const [account] = await tx.insert(accounts).values({
            userId: user.id,
            email,
            phone,
            password: hashedPassword,
            streetAddress,
            streetNumber,
            apartmentSuite,
            city,
            postalCode
        }).returning({ // Doesn't contain password
            id: accounts.id,
            userId: accounts.userId,
            businessId: accounts.businessId,
            email: accounts.email,
            phone: accounts.phone,
            streetAddress: accounts.streetAddress,
            streetNumber: accounts.streetNumber,
            apartmentSuite: accounts.apartmentSuite,
            city: accounts.city,
            postalCode: accounts.postalCode,
            createdAt: accounts.createdAt
        });

        return {user, account};
    });

    // 3) Generate JWT
    const token = await generateToken({
        id: account.id,
        email: account.email,
        name: user.username
    });

    return {
        user,
        account,
        token
    };
};

/** Service handling business registration. Hashes password, creates business & account in DB, and returns account & JWT. */
export const createBusiness = async (body: RegisterBusinessRequest): Promise<any> => {
    // 1) Destructure controller req.body & hash the password
    const {
        name, description, vatNumber, email, phone, password,
        streetAddress, streetNumber, apartmentSuite, city, postalCode
    } = body;
    const hashedPassword = await hashPassword(password);

    // 2) Create business & account
    const {business, account} = await db.transaction(async (tx) => {
        const [business] = await tx.insert(businesses).values({
            name,
            description,
            vatNumber
        }).returning({
            id: businesses.id,
            name: businesses.name,
            vatNumber: businesses.vatNumber
        });

        const [account] = await tx.insert(accounts).values({
            businessId: business.id,
            email,
            phone,
            password: hashedPassword,
            streetAddress,
            streetNumber,
            apartmentSuite,
            city,
            postalCode
        }).returning({ // Doesn't contain password
            id: accounts.id,
            userId: accounts.userId,
            businessId: accounts.businessId,
            email: accounts.email,
            phone: accounts.phone,
            streetAddress: accounts.streetAddress,
            streetNumber: accounts.streetNumber,
            apartmentSuite: accounts.apartmentSuite,
            city: accounts.city,
            postalCode: accounts.postalCode,
            createdAt: accounts.createdAt
        });

        return {business, account};
    });

    // 3) Generate JWT
    const token = await generateToken({
        id: account.id,
        email: account.email,
        name: business.name
    });

    return {
        business,
        account,
        token
    };
};

/** Service handling account login. Handles both user & business login. */
export const loginAccount = async (email: string, password: string): Promise<any> => {
    // 1) Find the account by email & load user / business through relations
    const account = await db.query.accounts.findFirst({
        where: eq(accounts.email, email),
        with: {
            user: true,
            business: true
        }
    }) as AccountWithOwner;
    if (!account)
        throw new Error('Invalid credentials');

    // 2) Validate password against the account's password hash
    const isValidPassword = await comparePasswords(password, account.password);
    if (!isValidPassword)
        throw new Error('Invalid credentials');

    // 3) Determine name based on account type
    const name = account.user?.username ?? account.business?.name;

    // 4) Generate JWT (user.username / business.name)
    const token = await generateToken({
        id: account.id,
        email: account.email,
        name: name as string
    });

    // Strip sensitive columns before returning `account`
    const {password: _password, deletedAt: _deletedAt, ...publicAccount} = account;

    // TODO: Revisit the User vs. Business logic
    return {
        account: publicAccount,
        user: account.user ?? undefined,
        business: account.business ?? undefined,
        token
    };
};
//#endregion PUBLIC