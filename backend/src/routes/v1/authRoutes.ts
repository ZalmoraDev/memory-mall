import {Router} from 'express';
import {login, registerBusiness, registerUser} from '../../controllers/v1/authController.ts';
import {validateBody} from '../../middleware/validation.ts';
import {insertBusinessSchema, insertUserSchema} from '../../db/schema.ts';
import {z} from 'zod';

const router = Router();

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password is required').max(255, 'Password must be 8-255 characters')
});

//region GET
//endregion


//region POST
router.post('/register/user', validateBody(insertUserSchema), registerUser);
router.post('/register/business', validateBody(insertBusinessSchema), registerBusiness);

router.post('/login', validateBody(loginSchema), login);
//endregion


//region PATCH/PUT/DELETE
//endregion

export {router};
export default router;