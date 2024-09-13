import express from 'express';

import {signIn, signUp, verify, sendCode} from '../controllers/users.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/verify', verify);
router.post('/sendCode', sendCode);

export default router;
