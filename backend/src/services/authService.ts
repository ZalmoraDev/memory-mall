import bcrypt from 'bcrypt';
import {eq} from 'drizzle-orm';
import {db} from '../db/connection.ts';
import {users, businesses, accounts, type User} from '../db/schema.ts';
import {generateToken} from '../utils/jwt.ts';
import {hashPassword, comparePasswords} from '../utils/passwords.ts';

//region PUBLIC

/** Service handling user registration. Hashes password, creates user in DB, and returns account & JWT.*/
export const createUser = async (body: any) => {
    // 1) Destructure controller req.body & hash the password
    const {
        username, firstName, lastName, email, phone, password,
        streetAddress, streetNumber, apartmentSuite, city, postalCode
    } = body;
    const hashedPassword = await hashPassword(password);

    // 2) Create user & account
    const result = await db.transaction(async (tx) => {
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
        }).returning({
            email: accounts.email
        });

        return {...user, ...account};
    });

    // 3) Generate JWT
    const token = await generateToken({
        id: result.id,
        email: result.email,
        name: result.username
    });

    return {account: result, token};
};

/** Service handling business registration. Hashes password, creates business & account in DB, and returns account & JWT.*/
export const createBusiness = async (body: any) => {
    // 1) Destructure controller req.body & hash the password
    const {
        name, description, vatNumber, email, phone, password,
        streetAddress, streetNumber, apartmentSuite, city, postalCode
    } = body;
    const hashedPassword = await hashPassword(password);



    // 2) Create business & account
    const result = await db.transaction(async (tx) => {
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
        }).returning({
            email: accounts.email,
            createdAt: accounts.createdAt
        });

        return {...business, ...account};
    });

    // 3) Generate JWT
    const token = await generateToken({
        id: result.id,
        email: result.email,
        name: result.name
    });

    return {account: result, token};
};

export const loginAccount = async (email: string, password: string) => {
    // 1) Find the account by email & load user / business through relations
    const account = await db.query.accounts.findFirst({
        where: eq(accounts.email, email),
        with: {
            user: true,
            business: true
        }
    });
    if (!account)
        throw new Error('Invalid credentials');

    // 2) Validate password against the account's password hash
    const isValidPassword = await comparePasswords(password, account.password);
    if (!isValidPassword)
        throw new Error('Invalid credentials');

    // 3) Extract user/business and name based on account type
    const userOrBusiness = (account.user || account.business)!;
    const name = account.user?.username || account.business?.name;

    // 4) Generate JWT
    const token = await generateToken({
        id: userOrBusiness.id,
        email: account.email,
        name: name as string
    });

    return {
        account: {
            ...userOrBusiness,
            email: account.email
        },
        token
    };
};
//endregion PUBLIC


//region PRIVATE

//region PRIVATE
