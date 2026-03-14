import {Router} from 'express';
import {login, register} from '../controllers/authController.ts';
import {validateBody} from '../middleware/validation.ts';
import {insertUserSchema} from '../db/schema.ts';
import {z} from 'zod';

const router = Router();

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(1, 'Password is required').max(255, 'Password must be less than 255 characters')
});

//region GET
//endregion


//region POST
router.post('/register', validateBody(insertUserSchema), register);

router.post('/login', validateBody(loginSchema), login);
//endregion


//region PATCH/PUT/DELETE
//endregion

export {router};
export default router;