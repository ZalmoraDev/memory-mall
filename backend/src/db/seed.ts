import {db} from './connection.ts';
import {
    users,
    businesses,
    accounts,
    categories,
    attributes,
    listings,
    listingImages,
    listingAttributeValues,
    orders,
    orderListings,
    cartItems
} from './schema.ts';
import {hashPassword} from '../utils/passwords.ts';

const seed = async () => {
    console.log('🌱 Starting database seed...');
    try {
        console.log('Clearing existing data...');

        // Delete in reverse order (because of table dependencies)
        await db.delete(cartItems);
        await db.delete(orderListings);
        await db.delete(orders);
        await db.delete(listingAttributeValues);
        await db.delete(listingImages);
        await db.delete(listings);
        await db.delete(attributes);
        await db.delete(categories);
        await db.delete(accounts);
        await db.delete(businesses);
        await db.delete(users);

        // region ACCOUNTS
        console.log('🟥[ 1/11] Creating demo user...');
        const [demoUser] = await db.insert(users).values({
            username: 'samsepi0l',
            firstName: 'Elliot',
            lastName: 'Alderson'
        }).returning();

        console.log('🟥[ 2/11] Creating demo business...');
        const [demoBusiness] = await db.insert(businesses).values({
            name: 'Mr. Robot',
            description: 'Computer Repair with a Smile!',
            vatNumber: 'VAT123456789'
        }).returning();

        console.log('🟥[ 3/11] Creating demo accounts...');
        const password123 = await hashPassword('password123');
        const [demoUserAccount] = await db.insert(accounts).values({
            userId: demoUser.id,
            email: 'user@example.com',
            phone: '(212) 555-0179',
            passwordHash: password123,
            streetAddress: '123 Main St',
            streetNumber: '1A',
            city: 'New York',
            postalCode: '12345'
        }).returning();
        const [demoBusinessAccount] = await db.insert(accounts).values({
            businessId: demoBusiness.id,
            email: 'business@example.com',
            passwordHash: password123,
            streetAddress: 'Purchase Street',
            streetNumber: '14',
            city: 'New York',
            postalCode: '10580'
        }).returning();
        // endregion ACCOUNTS


        // region CATEGORIES
        console.log('🟦[ 4/11] Creating categories...');
        const [computerHardwareCat] = await db.insert(categories).values({
            name: 'Computer Hardware',
            isFeatured: false
        }).returning();
        const [cpuCat] = await db.insert(categories).values({
            name: 'Processors (CPU\'s)',
            parentId: computerHardwareCat.id,
            isFeatured: true
        }).returning();

        console.log('🟦[ 5/11] Creating attributes...');
        const [cpuBrandAttr] = await db.insert(attributes).values({
            categoryId: cpuCat.id,
            name: 'Brand',
            dataType: 'string',
            isSelectable: true,
            isFeatured: true,
            isRequired: true
        }).returning();
        const [cpuCoresAttr] = await db.insert(attributes).values({
            categoryId: cpuCat.id,
            name: 'Cores',
            dataType: 'int',
            isSelectable: false,
            isFeatured: true,
            isRequired: true
        }).returning();
        const [cpuFrequencyAttr] = await db.insert(attributes).values({
            categoryId: cpuCat.id,
            name: 'Base Clock',
            dataType: 'decimal',
            isSelectable: false,
            isFeatured: true,
            isRequired: true,
            suffix: 'GHz'
        }).returning();
        const [cpuBaseClockAttr] = await db.insert(attributes).values({
            categoryId: cpuCat.id,
            name: 'Base Clock',
            dataType: 'int',
            isSelectable: false,
            isFeatured: true,
            isRequired: true,
            suffix: 'MHz'
        }).returning();
        const [cpuTdpAttr] = await db.insert(attributes).values({
            categoryId: cpuCat.id,
            name: 'TDP',
            dataType: 'int',
            isSelectable: false,
            isFeatured: true,
            isRequired: true,
            suffix: 'W'
        }).returning();
        // endregion CATEGORIES


        // region LISTINGS
        console.log('🟩[ 6/11] Creating listings...');
        const [amdCpuListing] = await db.insert(listings).values({
            sellingAccountId: demoBusinessAccount.id,
            title: 'AMD Opteron 850',
            description: 'First generation x86-64 AMD CPU',
            mainCategoryId: cpuCat.id,
            price: 200.00,
            stockQuantity: 50,
            condition: 'new',
            visitCount: 500,
            isListed: true
        }).returning();
        const [intelCpuListing] = await db.insert(listings).values({
            sellingAccountId: demoBusinessAccount.id,
            title: 'Intel Xeon 2.8GHz (Nocona)',
            description: 'First generation x86-64 Intel CPU',
            mainCategoryId: cpuCat.id,
            price: 200.00,
            stockQuantity: 5,
            condition: 'new',
            visitCount: 2500,
            isListed: true
        }).returning();

        console.log('🟩[ 7/11] Linking listingImages to listings (junction) (images already present)...');
        await db.insert(listingImages).values([
            {
                listingId: amdCpuListing.id,
                orderNr: 1,
                altText: 'AMD CPU top view'
            },
            {
                listingId: intelCpuListing.id,
                orderNr: 1,
                altText: 'Intel CPU top view'
            }
        ]);

        console.log('🟩[ 8/11] Creating listingAttributeValues (junction)...');
        await db.insert(listingAttributeValues).values([
            {
                listingId: amdCpuListing.id,
                attributeId: cpuBrandAttr.id,
                valueString: 'AMD'
            },
            {
                listingId: amdCpuListing.id,
                attributeId: cpuCoresAttr.id,
                valueInt: 1
            },
            {
                listingId: amdCpuListing.id,
                attributeId: cpuFrequencyAttr.id,
                valueDecimal: 2.4
            },
            {
                listingId: amdCpuListing.id,
                attributeId: cpuBaseClockAttr.id,
                valueInt: 200
            },
            {
                listingId: amdCpuListing.id,
                attributeId: cpuTdpAttr.id,
                valueInt: 89
            },
            {
                listingId: intelCpuListing.id,
                attributeId: cpuBrandAttr.id,
                valueString: 'Intel'
            },
            {
                listingId: intelCpuListing.id,
                attributeId: cpuCoresAttr.id,
                valueInt: 1
            },
            {
                listingId: intelCpuListing.id,
                attributeId: cpuFrequencyAttr.id,
                valueDecimal: 2.8
            },
            {
                listingId: intelCpuListing.id,
                attributeId: cpuBaseClockAttr.id,
                valueInt: 200
            },
            {
                listingId: intelCpuListing.id,
                attributeId: cpuTdpAttr.id,
                valueInt: 135
            }
        ]);
        // endregion LISTINGS


        // region ORDERS
        console.log('🟪[ 9/11] Creating orders...');
        const [order1] = await db.insert(orders).values({
            userId: demoUser.id,
            totalPrice: 600.00,
            status: 'delivered',
            orderedAt: new Date('2023-01-1'),
            shippedAt: new Date('2023-01-2'),
            deliveredAt: new Date('2023-01-5')
        }).returning();

        console.log('🟪[10/11] Creating orderListings (junction)...');
        await db.insert(orderListings).values([
            {
                orderId: order1.id,
                listingId: amdCpuListing.id,
                quantity: 2,
                priceSnapshot: 200.00
            },
            {
                orderId: order1.id,
                listingId: intelCpuListing.id,
                quantity: 1,
                priceSnapshot: 200.00
            }
        ]);

        console.log('🟪[11/11] Adding listings to cart (junction)...');
        await db.insert(cartItems).values({
            userId: demoUser.id,
            listingId: intelCpuListing.id,
            quantity: 5
        });
        // endregion ORDERS

        console.log('✅ DB seeded successfully');
        console.log('USER CREDENTIALS:');
        console.log(`email: ${demoUserAccount.email}`);
        console.log(`password: password123`);

        console.log('BUSINESS CREDENTIALS:');
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