import type {Response} from 'express';
import type {AuthenticatedRequest} from '../middleware/auth.ts';
import {db} from '../db/connection.ts';
import {habits, entries, habitTags, tags, type Habit} from '../db/schema.ts';
import {eq, and, desc, inArray} from 'drizzle-orm';


//region GET
/** GET /api/habits - Fetch all habits for `AuthenticatedRequest` `JwtPayload` user id, including associated tags. */
export const getUserHabits = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userHabitsWithTags = await db.query.habits.findMany({
            where: eq(habits.userId, req.user.id),
            with: {
                habitTags: { // LEFT JOIN related m:m habitTags ON each habit
                    with: {
                        tag: true // LEFT JOIN related m:1 tag ON each habitTag (:true = SELECT *)
                    }
                }
            },
            orderBy: [desc(habits.createdAt)]
        });

        const habitsWithTags = userHabitsWithTags.map(habit => ({
            ...habit,
            tags: habit.habitTags.map((ht) => ht.tag),
            habitTags: undefined
        }));

        res.status(200).json({
            message: 'Habits fetched successfully',
            habits: habitsWithTags
        });
    } catch (err) {
        console.error('Get habits error:', err);
        res.status(500).json({error: 'Failed to fetch habits'});
    }
};
//endregion


//region POST
/** POST /api/habits - Create a new habit for the authenticated user.*/
export const createHabit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {name, description, frequency, targetCount, tagIds} = req.body;

        // Start atomic transaction, every step being async
        const result = await db.transaction(async (tx) => {
            const [newHabit] = await tx.insert(habits).values({
                userId: req.user.id,
                name,
                description,
                frequency,
                targetCount
            }).returning();

            // If tagIds were provided, insert into habit_tags join table to associate to given habit
            if (tagIds && tagIds.length > 0) {
                const habitTagValues = tagIds.map((tagId) => ({
                    habitId: newHabit.id,
                    tagId
                }));
                await tx.insert(habitTags).values(habitTagValues);
            }

            return newHabit;
        });

        res.status(201).json({
            message: 'Habit created successfully',
            habit: result
        });
    } catch (err) {
        console.error('Create habit error:', err);
        res.status(500).json({error: 'Failed to create habit'});
    }
};
//endregion


//region PATCH/PUT/DELETE
/** PATCH /api/habits - Create a new habit for the authenticated user.*/
export const updateHabit = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const id = req.params.id;
        const {tagIds, ...updates} = req.body;

        // Start atomic transaction, every step being async
        const result = await db.transaction(async (tx) => {
            const [updatedHabit] = await tx
                .update(habits)
                .set({...updates, updatedAt: new Date()})
                .where(and(eq(habits.id, id), eq(habits.userId, req.user.id)))
                .returning();

            if (!updatedHabit)
                return res.status(401).end();

            // Replace all tags with new
            // TODO: Can be done more efficiently by only deleting/adding the differences between old and new tagIds
            if (tagIds !== undefined) {
                await tx.delete(habitTags).where(eq(habitTags.habitId, id));

                if (tagIds.length > 0) {
                    const habitTagValues = tagIds.map((tagId) => ({
                        habitId: id,
                        tagId
                    }));

                    await tx.insert(habitTags).values(habitTagValues);
                }
            }

            return updatedHabit;
        });

        res.status(200).json({
            message: 'Habit was updated successfully',
            habit: result
        });
    } catch (err) {
        console.error('Update habit error:', err);
        res.status(500).json({error: 'Failed to update habit'});
    }
};
//endregion

