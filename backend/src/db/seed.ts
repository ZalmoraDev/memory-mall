import {db} from './connection.ts';
import {
    users,
    businesses,
    accounts,
    categories,
    attributes,
    categoryAttributes,
    listings,
    listingImages,
    listingAttributeValues,
    orders,
    orderListings,
    cartItems
} from './schema.ts';
import {hashPassword} from '../utils/passwords.ts';

const seed = async () => {
    try {
        console.log('🌱 Starting database seed...');
        console.log('Clearing existing data...');

        // Delete in reverse order (because of table dependencies)
        await db.delete(cartItems);
        await db.delete(orderListings);
        await db.delete(orders);
        await db.delete(listingAttributeValues);
        await db.delete(listingImages);
        await db.delete(listings);
        await db.delete(categoryAttributes);
        await db.delete(attributes);
        await db.delete(categories);
        await db.delete(accounts);
        await db.delete(businesses);
        await db.delete(users);

        // region ACCOUNTS
        console.log('🟥[ 1/12] Creating demo user...');
        const [demoUser] = await db.insert(users).values({
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe'
        }).returning();

        console.log('🟥[ 2/12] Creating demo business...');
        const [demoBusiness] = await db.insert(businesses).values({
            name: 'RetroTech Inc.',
            description: 'The best source for vintage computing.',
            vatNumber: 'VAT123456789'
        }).returning();

        console.log('🟥[ 3/12] Creating demo accounts...');
        const commonPassword = await hashPassword('password123');

        const [demoUserAccount] = await db.insert(accounts).values({
            userId: demoUser.id,
            email: 'john@example.com',
            passwordHash: commonPassword,
            streetAddress: '123 Main St',
            streetNumber: '1A',
            city: 'Retroville',
            postalCode: '12345'
        }).returning();

        const [demoBusinessAccount] = await db.insert(accounts).values({
            businessId: demoBusiness.id,
            email: 'sales@retrotech.com',
            passwordHash: commonPassword,
            streetAddress: '456 Business Ave',
            streetNumber: '100',
            city: 'Tech City',
            postalCode: '67890'
        }).returning();
        // endregion ACCOUNTS


        // region CATEGORIES
        console.log('🟦[ 4/12] Creating categories...');
        const [electronics] = await db.insert(categories).values({
            name: 'Electronics',
            isFeatured: true
        }).returning();
        const [clothing] = await db.insert(categories).values({
            name: 'Clothing',
            isFeatured: false
        }).returning();
        const [computers] = await db.insert(categories).values({
            name: 'Computers',
            parentId: electronics.id,
            isFeatured: true
        }).returning();
        const [components] = await db.insert(categories).values({
            name: 'Components',
            parentId: electronics.id,
            isFeatured: false
        }).returning();

        console.log('🟦[ 5/12] Creating attributes...');
        const [brandAttr] = await db.insert(attributes).values({
            name: 'Brand',
            dataType: 'string'
        }).returning();
        const [ramAttr] = await db.insert(attributes).values({
            name: 'RAM',
            dataType: 'string'
        }).returning();
        const [coresAttr] = await db.insert(attributes).values({
            name: 'Cores',
            dataType: 'int'
        }).returning();

        console.log('🟦[ 6/12] Linking categories and attributes...');
        await db.insert(categoryAttributes).values([
            {
                categoryId: computers.id,
                attributeId: brandAttr.id,
                isFeatured: true,
                isRequired: true
            },
            {
                categoryId: computers.id,
                attributeId: ramAttr.id,
                isFeatured: true,
                isRequired: false
            },
            {
                categoryId: components.id,
                attributeId: coresAttr.id,
                isFeatured: false,
                isRequired: true
            }
        ]);
        // endregion CATEGORIES


        // region LISTINGS
        console.log('🟩[ 7/12] Creating listings...');
        const [vintagePC] = await db.insert(listings).values({
            sellingAccountId: demoBusinessAccount.id,
            title: 'Vintage IBM PC 5150',
            description: 'A classic piece of computing history.',
            mainCategoryId: computers.id,
            price: '1200.00',
            stockQuantity: 5,
            condition: 'used',
            visitCount: 150,
            isListed: true
        }).returning();
        const [gamingMouse] = await db.insert(listings).values({
            sellingAccountId: demoBusinessAccount.id,
            title: 'Retro Gaming Mouse',
            description: 'Ball mouse with PS/2 connector.',
            mainCategoryId: components.id,
            price: '25.50',
            stockQuantity: 20,
            condition: 'new',
            visitCount: 45,
            isListed: true
        }).returning();

        console.log('🟩[ 8/12] Adding listing images...');
        await db.insert(listingImages).values([
            {
                listingId: vintagePC.id,
                orderNr: 1,
                altText: 'Front view of IBM PC 5150'
            },
            {
                listingId: vintagePC.id,
                orderNr: 2,
                altText: 'Back view of ports'
            },
            {
                listingId: gamingMouse.id,
                orderNr: 1,
                altText: 'Gaming Mouse Top View'
            }
        ]);

        console.log('🟩[ 9/12] Adding listing attributes...');
        await db.insert(listingAttributeValues).values([
            {
                listingId: vintagePC.id,
                attributeId: brandAttr.id,
                valueString: 'IBM'
            },
            {
                listingId: vintagePC.id,
                attributeId: ramAttr.id,
                valueString: '64KB'
            }
            // gamingMouse is in 'Components' category which has 'Cores' attribute, 
            // but let's assume 'Gaming Mouse' doesn't really have cores or we skip it for now 
            // unless it's required. Cores IS required for Components.
            // Wait, Mouse is not a CPU, so Components might be a bad category or I should add a subcat Peripherals.
            // For simplicity, let's just add a Cores value or move it. 
            // Or better, add a CPU product.
        ]);
        // Let's add CPU instead of mouse to be semantically correct with "Cores" attribute
        const [pentiumCPU] = await db.insert(listings).values({
            sellingAccountId: demoBusinessAccount.id,
            title: 'Intel Pentium 4',
            description: 'Legendary heater.',
            mainCategoryId: components.id,
            price: '15.00',
            stockQuantity: 50,
            condition: 'used',
            visitCount: 10,
            isListed: true
        }).returning();
        await db.insert(listingAttributeValues).values([
            {
                listingId: pentiumCPU.id,
                attributeId: coresAttr.id,
                valueInt: 1
            }
        ]);
        // endregion LISTINGS


        // region ORDERS
        console.log('🟪[10/12] Creating orders...');
        const [order1] = await db.insert(orders).values({
            userId: demoUser.id,
            totalPrice: '1225.50',
            status: 'delivered',
            orderedAt: new Date('2023-01-15'),
            shippedAt: new Date('2023-01-16'),
            deliveredAt: new Date('2023-01-20')
        }).returning();
        console.log('🟪[11/12] Adding items to orders...');
        await db.insert(orderListings).values([
            {
                orderId: order1.id,
                listingId: vintagePC.id,
                quantity: 1,
                priceSnapshot: '1200.00'
            },
            {
                orderId: order1.id,
                listingId: gamingMouse.id,
                quantity: 1,
                priceSnapshot: '25.50'
            }
        ]);
        console.log('🟪[12/12] Adding items to cart...');
        await db.insert(cartItems).values({
            userId: demoUser.id,
            listingId: pentiumCPU.id,
            quantity: 2
        });
        // endregion ORDERS

        console.log('✅ DB seeded successfully');
        console.log('User credentials:');
        console.log(`email: ${demoUserAccount.email}`);
        console.log(`password: password123`);
        console.log('Business credentials:');
        console.log(`email: ${demoBusinessAccount.email}`);
        console.log(`password: password123`);

    } catch (e) {
        console.error('❌ Seed failed: ', e);
        process.exit(1);
    }
};

// If this file is run directly (e.g. `npm run db:seed`), execute the seed function. Prevents being run when imported by other modules.
if (import.meta.url === 'file://' + process.argv[1]) {
    seed()
        .then(() => process.exit(0))
        .catch((e) => process.exit(1));
}

export {seed};
export default seed;