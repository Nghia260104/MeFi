import express from 'express';
import {
  createComment,
  deleteComment,
  getComments,
  likeComment,
} from '../controllers/community.js';

const router = express.Router();

router.post('/comments/get', getComments);
router.post('/create', createComment);
router.post('/comments/delete', deleteComment);
router.post('/comments/like', likeComment);

export default router;
