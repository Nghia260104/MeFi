import express from 'express';
import { getBlogs, createBlog, deleteBlog, likeBlog, getComments, deleteComment, createComment, likeComment } from '../controllers/community.js';

const router = express.Router();

router.post('/blogs/get', getBlogs);
router.post('/blogs/create', createBlog);
router.post('/blogs/delete', deleteBlog);
router.post('/blogs/like', likeBlog);
router.post('/comments/get', getComments);
router.post('/comments/create', createComment);
router.post('/comments/delete', deleteComment);
router.post('/comments/like', likeComment);

export default router;
