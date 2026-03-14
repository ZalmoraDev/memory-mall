import {Router} from 'express';

import {authenticateToken} from '../middleware/auth.ts';

const router = Router();

//region GET
router.get('/2-routing', (req, res) => {
    res.json({message: 'users retrieved'});
});

router.get('/:id', (req, res) => {
    res.json({message: 'got user'});
});
//endregion


//region POST
//endregion


//region PATCH/PUT/DELETE
router.put('/:id', (req, res) => {
    res.json({message: 'user updated'});
});

router.delete('/:id', (req, res) => {
    res.json({message: 'user deleted'});
});
//endregion

export {router};
export default router;