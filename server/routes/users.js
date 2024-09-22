import express from 'express';

import {signIn, signUp, verify, sendCode, setPeriodRange, setPeriodType, checkEmail} from '../controllers/users.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);
router.post('/verify', verify);
router.post('/sendCode', sendCode);
router.post('checkemail', checkEmail);
router.post('/periodRange', setPeriodRange);
router.post('/periodType', setPeriodType);

export default router;
