import type { Account } from '../backend/src/db/schema';

// Backend/Frontend Convention:
// - Backend: imports entity types directly from `backend/src/db/schema.ts`
// - Both: import WIRE/DTO types from this file
// - Frontend: imports entity types from this file

// Safe entity types (Drizzle-inferred), re-exported for the frontend.
export type {
    User, Business,
    Category, Attribute, ListingAttributeValue,
    Listing, ListingImage,
    Order, OrderListing, CartItem
} from '../backend/src/db/schema';

/** Account that's safe to expose over the wire; no sensitive fields. */
export type AccountPublic = Omit<Account, 'password' | 'deletedAt'>;
