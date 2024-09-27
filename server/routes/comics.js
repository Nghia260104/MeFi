import express from 'express';

import {getComics} from '../controllers/comics.js';

const router = express.Router();

router.post('/get', getComics);

export default router;
