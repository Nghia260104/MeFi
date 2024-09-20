import express from 'express';

import { getGlobalVaccine, setVaccine, getVaccine, deleteVaccine } from '../controllers/vaccines.js';

const router = express.Router();

router.post('/getGlobal', getGlobalVaccine);
router.post('/set', setVaccine);
router.post('/get', getVaccine);
router.post('/delete', deleteVaccine);

export default router;
