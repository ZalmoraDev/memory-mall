import {
    pgTable,
    uuid,
    varchar,
    text,
    timestamp,
    boolean,
    integer, type PgTableWithColumns,
} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';
import {Relations} from 'drizzle-orm/relations';
import {type BuildSchema, createInsertSchema, createSelectSchema} from 'drizzle-zod';

// region TABLES
// Define DB schema using Drizzle ORM's table definitions

export const users: PgTableWithColumns<any> = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', {length: 255}).notNull().unique(),
    username: varchar('username', {length: 32}).notNull().unique(),
    password: varchar('password', {length: 255}).notNull(),
    firstName: varchar('first_name', {length: 50}),
    lastName: varchar('last_name', {length: 50}),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
});

export const habits: PgTableWithColumns<any> = pgTable('habits', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, {onDelete: 'cascade'}).notNull(),
    name: varchar('name', {length: 128}).notNull(),
    description: text('description').notNull(),
    frequency: varchar('frequency', {length: 20}).notNull(), // TODO: Replace with enum (daily, weekly, etc.)
    targetCount: integer('target_count').default(1),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
});

export const entries: PgTableWithColumns<any> = pgTable('entries', {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('habit_id').references(() => habits.id, {onDelete: 'cascade'}).notNull(),
    completionDate: timestamp('completion_date').defaultNow().notNull(),
    note: text('note'),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export const tags: PgTableWithColumns<any> = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 64}).notNull(),
    color: varchar('color', {length: 7}).default('#6b7280'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull()
});

export const habitTags: PgTableWithColumns<any> = pgTable('habitTags', {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('habit_id').references(() => habits.id, {onDelete: 'cascade'}).notNull(),
    tagId: uuid('tag_id').references(() => tags.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
// endregion TABLES

// TODO: Add unique to tags, but for compound of userId + name, so that different users can have same tag names

// region RELATIONS
// Define table relations using Drizzle's relations() API.
// relations() invokes the callback with helper functions { one, many },
// which are destructured and used to declare relations between tables.
// This runs when the module is first imported, creating relation mappings used by Drizzle.

export const userRelations = relations(users, ({many}) => ({
    habits: many(habits)
}));

export const habitRelations = relations(habits, ({one, many}) => ({
    user: one(users, {
        fields: [habits.userId],
        references: [users.id]
    }),
    entries: many(entries),
    habitTags: many(habitTags)
}));

export const entryRelations = relations(entries, ({one}) => ({
    habit: one(habits, {
        fields: [entries.habitId],
        references: [habits.id]
    })
}));

export const tagRelations = relations(tags, ({many}) => ({
    habitTags: many(habitTags)
}));

export const habitTagRelations = relations(habitTags, ({one}) => ({
    habit: one(habits, {
        fields: [habitTags.habitId],
        references: [habits.id]
    }),
    tag: one(tags, {
        fields: [habitTags.habitId],
        references: [tags.id]
    })
}));

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