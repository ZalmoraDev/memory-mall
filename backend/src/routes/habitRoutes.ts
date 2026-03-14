import {Router} from 'express';
import {z} from 'zod';

import {validateBody, validateParams} from '../middleware/validation.ts';
import {authenticateToken} from '../middleware/auth.ts';
import {createHabit, getUserHabits, updateHabit} from '../controllers/habitController.ts';

const router = Router();

// Zod schema for validating body, not using `schema.ts` schema's since the request body
// is not 1:1 with the habit DB schema (POST body includes tagIds array, which the DB schema does not)
const createHabitSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    frequency: z.string(),
    targetCount: z.number(),
    tagIds: z.array(z.string()).optional()
});

const completeParamsSchema = z.object({
    id: z.string()
});


//region GET
router.get('/', getUserHabits);

router.get('/:id', (req, res) => {
    res.json({message: 'got one habit'});
});
//endregion


//region POST
router.post('/', validateBody(createHabitSchema), createHabit);

router.post('/:id/complete', validateParams(completeParamsSchema), (req, res) => {
    res.status(201).json({message: 'created habit'});
});
//endregion


//region PATCH/PUT/DELETE
router.patch('/:id', updateHabit);

router.delete('/:id', (req, res) => {
    res.json({message: 'deleted habit'});
});
//endregion

export {router};
export default router;