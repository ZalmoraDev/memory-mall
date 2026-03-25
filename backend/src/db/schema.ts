import {sql} from 'drizzle-orm';
import {
    pgTable,
    pgEnum,
    check,
    uuid,
    varchar,
    text,
    timestamp,
    boolean,
    integer,
    smallint,
    real,
    type PgTableWithColumns,
    type PgEnum, decimal
} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';
import {Relations} from 'drizzle-orm/relations';
import {type BuildSchema, createInsertSchema, createSelectSchema} from 'drizzle-zod';

// region TABLES
// DB schema using Drizzle ORM's table definitions, see /docs/ERD.png for ERD diagram.
// Before every table entry is noted what ERD group they belong to within the diagram, enums after
// Groups: ACCOUNTS, ORDERS, LISTINGS & CATEGORIES

// Enums
export const orderStatus: PgEnum<any> = pgEnum('order_status', ['ordered', 'in_transit', 'delivered']); // ORDER
export const dataType: PgEnum<any> = pgEnum('order_status', ['string', 'int', 'float', 'decimal', 'bool']); // CATEGORIES
export const listingCondition: PgEnum<any> = pgEnum('listing_condition', ['new', 'refurbished', 'used', 'modded_new', 'modded_used']); // LISTINGS

// 🟥ACCOUNTS
export const users: PgTableWithColumns<any> = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', {length: 32}).notNull().unique(),
    firstName: varchar('first_name', {length: 64}).notNull(),
    lastName: varchar('last_name', {length: 64}).notNull()
});

// 🟥ACCOUNTS
export const businesses: PgTableWithColumns<any> = pgTable('businesses', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 128}).notNull().unique(),
    description: text('description'),
    vatNumber: varchar('vat_number', {length: 32}).notNull().unique()
});

// 🟥ACCOUNTS | C2 can only have 1 NOT NULL
// @formatter:off
export const accounts: PgTableWithColumns<any> = pgTable('accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
    businessId: uuid('business_id').notNull().references(() => businesses.id, {onDelete: 'cascade'}),
    email: varchar('email', {length: 254}).notNull().unique(),
    phone: varchar('phone', {length: 15}),
    passwordHash: text('password_hash').notNull(),
    streetAddress: varchar('street_address', {length: 128}).notNull(),
    streetNumber: varchar('street_number', {length: 16}).notNull(),
    apartmentSuite: varchar('apartment_suite', {length: 32}),
    city: varchar('city', {length: 128}).notNull(),
    postalCode: varchar('postal_code', {length: 16}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at').default(null)
}, (table) => [check('account_unique_owner_check', sql`
    (${table.userId} IS NOT NULL AND ${table.businessId} IS NULL) OR 
    (${table.userId} IS NULL AND ${table.businessId} IS NOT NULL)
    `)
]);
// @formatter:on

// 🟦CATEGORIES
export const categories: PgTableWithColumns<any> = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 128}).notNull(),
    isFeatured: boolean('is_featured').notNull().default(false),
    parentId: uuid('parent_id').references(() => categories.id, {onDelete: 'cascade'})
});

// 🟦CATEGORIES
export const attributes: PgTableWithColumns<any> = pgTable('attributes', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 128}).notNull(),
    dataType: dataType('data_type').notNull()
});

// 🟦CATEGORIES, junction
export const categoryAttributes: PgTableWithColumns<any> = pgTable('category_attributes', {
    categoryId: uuid('category_id').primaryKey().references(() => categories.id, {onDelete: 'cascade'}),
    attributeId: uuid('attribute_id').primaryKey().references(() => attributes.id, {onDelete: 'cascade'}),
    isFeatured: boolean('is_featured').notNull().default(false),
    isRequired: boolean('is_required').notNull().default(false)
});

// 🟩LISTINGS
export const listings: PgTableWithColumns<any> = pgTable('listings', {
    id: uuid('id').primaryKey().defaultRandom(),
    sellingAccountId: uuid('selling_account_id').notNull().references(() => accounts.id, {onDelete: 'cascade'}),
    title: varchar('title', {length: 128}).notNull(),
    description: text('description'),
    mainCategoryId: uuid('main_category_id').notNull().references(() => categories.id, {onDelete: 'cascade'}),
    price: decimal('price', {precision: 4, scale: 2}).notNull(),
    stockQuantity: smallint().notNull(),
    condition: listingCondition('condition').notNull(),
    visitCount: integer('visit_count').notNull().default(0),
    isListed: boolean('is_listed').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').default(null)
});

// 🟩LISTINGS
export const listingImages: PgTableWithColumns<any> = pgTable('listing_images', {
    id: uuid('id').primaryKey().defaultRandom(),
    listingId: uuid('listing_id').notNull().references(() => listings.id, {onDelete: 'cascade'}),
    orderNr: smallint('order_nr').notNull(),
    altText: varchar('alt_text', {length: 256}).notNull()
});


// 🟦CATEGORIES, junction | C1 can only have 0 OR 1 be NOT NULL, 0 is when is_required is FALSE
// @formatter:off
// TODO: Maybe change valueFloat being stored as a "real" to decimal
export const listingAttributeValues: PgTableWithColumns<any> = pgTable('listing_attribute_values', {
    listingId: uuid('listing_id').primaryKey().references(() => listings.id, {onDelete: 'cascade'}),
    attributeId: uuid('attribute_id').primaryKey().references(() => attributes.id, {onDelete: 'cascade'}),
    valueString: varchar('value_string', {length: 256}),
    valueInt: integer('value_int'),
    valueFloat: real('value_float'),
    valueDecimal: decimal('value_decimal', {precision: 64, scale: 2}),
    valueBool: boolean('value_bool')
}, (table) => [check('account_unique_owner_check', sql`
    (${table.valueString} IS NOT NULL)::int +
    (${table.valueInt} IS NOT NULL)::int +
    (${table.valueFloat} IS NOT NULL)::int +
    (${table.valueDecimal} IS NOT NULL)::int +
    (${table.valueBool} IS NOT NULL)::int <= 1
    `)
]);
// @formatter:on

// 🟪ORDERS
export const orders: PgTableWithColumns<any> = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id, {onDelete: 'cascade'}),
    totalPrice: decimal('total_price', {precision: 6, scale: 2}).notNull(),
    status: orderStatus('status').notNull().default('ordered'),
    orderedAt: timestamp().defaultNow().notNull(),
    shippedAt: timestamp().default(null),
    deliveredAt: timestamp().default(null)
});

// 🟪ORDERS, junction
export const orderListings: PgTableWithColumns<any> = pgTable('order_listings', {
    orderId: uuid('order_id').primaryKey().references(() => orders.id, {onDelete: 'cascade'}),
    listingId: uuid('listing_id').primaryKey().references(() => listings.id, {onDelete: 'cascade'}),
    quantity: smallint('quantity').notNull(),
    priceSnapshot: decimal('price_snapshot', {precision: 64, scale: 2}).notNull()
});

// 🟪ORDERS, junction
export const cartItems: PgTableWithColumns<any> = pgTable('cart_ttems', {
    userId: uuid('user_id').primaryKey().references(() => users.id, {onDelete: 'cascade'}),
    listingId: uuid('listing_id').primaryKey().references(() => listings.id, {onDelete: 'cascade'}),
    quantity: smallint('quantity').notNull()
});
// endregion TABLES


// region RELATIONS
// relations() invokes the callback with helper functions { one, many },
// which are destructured and used to declare relations between tables.
// This runs when the module is first imported, creating relation mappings used by Drizzle.

// 🟥ACCOUNTS
export const userRelations = relations(users, ({one, many}) => ({
    account: one(accounts, {
        fields: [users.id],
        references: [accounts.userId]
    }),
    cartItems: many(cartItems),
    orders: many(orders)
}));

// 🟥ACCOUNTS
export const businessRelations = relations(businesses, ({one}) => ({
    account: one(accounts, {
        fields: [businesses.id],
        references: [accounts.businessId]
    })
}));

// 🟥ACCOUNTS
export const accountRelations = relations(accounts, ({one}) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    }),
    business: one(businesses, {
        fields: [accounts.businessId],
        references: [businesses.id]
    }),
}));


// 🟦CATEGORIES
export const categoryRelations = relations(categories, ({one, many}) => ({
    parent: one(categories, {
        fields: [categories.parentId],
        references: [categories.id]
    }),
    children: many(categories),
    listings: many(listings),
    categoryAttributes: many(categoryAttributes)
}));

// 🟦CATEGORIES
export const attributeRelations = relations(attributes, ({many}) => ({
    categoryAttributes: many(categoryAttributes),
    listingAttributeValues: many(listingAttributeValues)
}));

// 🟦CATEGORIES, junction
export const categoryAttributeRelations = relations(categoryAttributes, ({one}) => ({
    category: one(categoryAttributes, {
        fields: [categoryAttributes.categoryId],
        references: [categories.id]
    }),
    attribute: one(categoryAttributes, {
        fields: [categoryAttributes.attributeId],
        references: [attributes.id]
    })
}));

// 🟦CATEGORIES, junction
export const listingAttributeValueRelations = relations(listingAttributeValues, ({one}) => ({
    listing: one(listingAttributeValues, {
        fields: [listingAttributeValues.listingId],
        references: [listings.id]
    }),
    attribute: one(listingAttributeValues, {
        fields: [listingAttributeValues.attributeId],
        references: [attributes.id]
    })
}));


// 🟩LISTINGS
export const listingRelations = relations(listings, ({one, many}) => ({
    sellingAccount: one(listings, {
        fields: [listings.sellingAccountId],
        references: [accounts.id]
    }),
    mainCategory: one(listings, {
        fields: [listings.mainCategoryId],
        references: [categories.id]
    }),
    listingImages: many(listingImages),
    listingAttributeValues: many(listingAttributeValues),
    orderListings: many(orderListings),
    cartItems: many(cartItems)
}));

// 🟩LISTINGS
export const listingImageRelations = relations(listingImages, ({one}) => ({
    listing: one(listingImages, {
        fields: [listingImages.listingId],
        references: [listings.id]
    })
}));


// 🟪ORDERS
export const orderRelations = relations(orders, ({one, many}) => ({
    user: one(orders, {
        fields: [orders.userId],
        references: [users.id]
    }),
    orderListings: many(orderListings)
}));

// 🟪ORDERS, junction
export const orderListingRelations = relations(orderListings, ({one}) => ({
    order: one(orderListings, {
        fields: [orderListings.orderId],
        references: [orders.id]
    }),
    listing: one(orderListings, {
        fields: [orderListings.listingId],
        references: [listings.id]
    }),
}));

// 🟪ORDERS, junction
export const cartItemRelations = relations(cartItems, ({one}) => ({
    user: one(cartItems, {
        fields: [cartItems.userId],
        references: [users.id]
    }),
    listing: one(cartItems, {
        fields: [cartItems.listingId],
        references: [listings.id]
    }),
}));
// endregion RELATIONS


// region EXPORT TYPES & VALIDATION SCHEMAS
// Export TS types derived from table schemas
// $inferInsert generates types for inserts, these wouldn't require NOT NULL defaults (like createdAt, updatedAt, id),
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Habit = typeof habits.$inferSelect;
export type NewHabit = typeof habits.$inferInsert;

export type Entries = typeof entries.$inferSelect;
export type Tags = typeof tags.$inferSelect;
export type HabitTag = typeof habitTags.$inferSelect;

// Export Zod schemas for validating data against the table structures
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertHabitSchema = createInsertSchema(habits);
export const selectHabitSchema = createSelectSchema(habits);

export const insertEntrySchema = createInsertSchema(entries);
export const selectEntrySchema = createSelectSchema(entries);

export const insertTagSchema = createInsertSchema(tags);
export const selectTagSchema = createSelectSchema(tags);

export const insertHabitTagSchema = createInsertSchema(habitTags);
export const selectHabitTagSchema = createSelectSchema(habitTags);
// endregion EXPORT VALIDATION