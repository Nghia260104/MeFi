import blogs from '../models/blogs.js';
import comments from '../models/comments.js';

export const getBlogs = async (req, res) => {
    try {
        const Blogs = blogs.find({});
        if (!Blogs) {
            res.status(404).json({message: 'No blogs found'});
        }

        res.status(200).json({blogs: Blogs});
    } catch (error) {
        res.status(500).json({message: 'Somethine went wrong!'});
    }
};

export const createBlog = async (req, res) => {
    const {creator, content} = req.body;

    try {
        await blogs.create({createdAt: Date.now(), content, creator});
        const Blogs = await blogs.find({});

        if (!Blogs) {
            res.status(404).json({message: 'No blogs found'});
        }

        res.status(200).json({blogs: Blogs});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const deleteBlog = async (req, res) => {
    const {user, blog_id} = req.body;

    try {
        const cur = await blogs.find({_id: blog_id});
        if (!cur) {
            return res.status(404).json({message: 'No blog found'});
        }

        if (cur.creator !== user) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }

        await blogs.deleteOne({_id: blog_id});
        const Blogs = await blogs.find({});
        if (!Blogs) {
            res.status(404).json({message: 'No blogs found'});
        }

        res.status(200).json({blogs: Blogs});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const likeBlog = async (req, res) => {
    const {user, blog_id} = req.body;

    try {
        const cur = await blogs.find({_id: blog_id});
        if (!cur) {
            return res.status(404).json({message: 'No blog found'});
        }

        const index = cur.likes.findIndex((id) => id === user);
        if (index === -1) {
            cur.likes.push(user);
        } else {
            cur.likes = cur.likes.filter((id) => id !== user);
        }

        const Blogs = await blogs.find({});
        if (!Blogs) {
            res.status(404).json({message: 'No blogs found'});
        }

        res.status(200).json({blogs: Blogs});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const getComments = async (req, res) => {
    try {
        const Comments = comments.find({});
        if (!Comments) {
            res.status(404).json({message: 'No comments found'});
        }

        res.status(200).json({comments: Comments});
    } catch (error) {
        res.status(500).json({message: 'Somethine went wrong!'});
    }
};

export const createComment = async (req, res) => {
    const {creator, content, type, blog_id, comment_id} = req.body;
    try {
        if (!type) {
            await comments.create({creator, content, blog: blog_id, createdAt: Date.now()});
            const Comments = await comments.find({});
            if (Comments) {
                res.status(404).json({message: 'Comments not found'});
            }
            res.status(200).json({comments: comments});
        }
        else {
            await comments.create({creator, content, comment: comment_id, createdAt: Date.now()});
            const Comments = await comments.find({});
            if (Comments) {
                res.status(404).json({message: 'Comments not found'});
            }
            res.status(200).json({comments: comments});
        }
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const deleteComment = async (req, res) => {
    const {user, comment_id} = req.body;

    try {
        const cur = await comments.find({_id: comment_id});
        if (!cur) {
            return res.status(404).json({message: 'No comment found'});
        }

        if (cur.creator !== user) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }

        await comments.deleteOne({_id: comment_id});
        const Comments = await comments.find({});
        if (!Comments) {
            res.status(404).json({message: 'No comments found'});
        }

        res.status(200).json({comments: Comments});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const likeComment = async (req, res) => {
    const {user, comment_id} = req.body;

    try {
        const cur = await comments.find({_id: comment_id});
        if (!cur) {
            return res.status(404).json({message: 'No blog found'});
        }

        const index = cur.likes.findIndex((id) => id === user);
        if (index === -1) {
            cur.likes.push(user);
        } else {
            cur.likes = cur.likes.filter((id) => id !== user);
        }

        const Comments = await comments.find({});
        if (!Comments) {
            res.status(404).json({message: 'No comments found'});
        }

        res.status(200).json({comments: Comments});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};
