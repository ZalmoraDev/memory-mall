import {Router} from 'express';
import {login, registerBusiness, registerUser} from '../../controllers/v1/authController.ts';
import {validateBody} from '../../middleware/validation.ts';

import {registerBusinessVal, loginVal, registerUserVal} from '../../validators/accounts.ts';

const router = Router();

//region GET
//endregion


//region POST
router.post('/register/user', validateBody(registerUserVal), registerUser);
router.post('/register/business', validateBody(registerBusinessVal), registerBusiness);

router.post('/login', validateBody(loginVal), login);
//endregion


//region PATCH/PUT/DELETE
//endregion

export {router};
export default router;