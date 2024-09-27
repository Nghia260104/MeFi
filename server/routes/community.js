import express from 'express';
import {
  getBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
} from '../controllers/community.js';

const router = express.Router();

router.post('/blogs/get', getBlogs);
router.post('/blogs/create', createBlog);
router.post('/blogs/delete', deleteBlog);
router.post('/blogs/like', likeBlog);

export default router;
