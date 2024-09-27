import blogs from '../models/blogs.js';
import comments from '../models/comments.js';
import {io} from '../server.js'; // Import the Socket.IO instance

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const Blogs = await blogs.find({});
    if (!Blogs) {
      return res.status(404).json({message: 'No blogs found'});
    }
    res.status(200).json({blogs: Blogs});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Create a new blog and emit the event
export const createBlog = async (req, res) => {
  const {creator, content, name} = req.body;

  try {
    try {
      const newBlog = await blogs.create({
        createdAt: Date.now(),
        content,
        creator,
        name,
      });
      io.emit('new_blog', newBlog); // Emit new blog event
    } catch (err) {
      console.log(err);
    }

    const Blogs = await blogs.find({});
    if (!Blogs) {
      return res.status(404).json({message: 'No blogs found'});
    }
    res.status(200).json({blogs: Blogs});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Delete a blog and emit the event
export const deleteBlog = async (req, res) => {
  const {user, blog_id} = req.body;

  try {
    const cur = await blogs.findById(blog_id);
    if (!cur) {
      return res.status(404).json({message: 'No blog found'});
    }
    if (cur.creator.toString() !== user) {
      return res.status(400).json({message: 'Invalid credentials!'});
    }

    await blogs.deleteOne({_id: blog_id});
    io.emit('delete_blog', blog_id); // Emit blog deletion event

    const Blogs = await blogs.find({});
    res.status(200).json({blogs: Blogs});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Like/unlike a blog and emit the event
export const likeBlog = async (req, res) => {
  const {user, blog_id} = req.body;

  try {
    const cur = await blogs.findById(blog_id);
    if (!cur) {
      return res.status(404).json({message: 'No blog found'});
    }

    // const index = cur.likes.indexOf(user);
    const exist = cur.likes.includes(user);
    if (exist) {
      cur.likes.push(user);
    } else {
      cur.likes.pull(user);
    }
    await cur.save();
    io.emit('like_blog', {blog_id, user, likes: cur.likes}); // Emit like event

    const Blogs = await blogs.find({});
    res.status(200).json({blogs: Blogs});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Get comments
export const getComments = async (req, res) => {
  try {
    const Comments = await comments.find({});
    if (!Comments) {
      return res.status(404).json({message: 'No comments found'});
    }
    res.status(200).json({comments: Comments});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Create a comment and emit the event
export const createComment = async (req, res) => {
  const {creator, content, blog_id, name} = req.body;
  try {
    const newComment = await comments.create({
      name,
      creator,
      content,
      blog: blog_id,
      createdAt: Date.now(),
    });
    io.emit('new_comment', newComment); // Emit new comment event

    const Comments = await comments.find({});

    res.status(200).json({comments: Comments});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Delete a comment and emit the event
export const deleteComment = async (req, res) => {
  const {user, comment_id} = req.body;

  try {
    const cur = await comments.findById(comment_id);
    if (!cur) {
      return res.status(404).json({message: 'No comment found'});
    }
    if (cur.creator.toString() !== user) {
      return res.status(400).json({message: 'Invalid credentials!'});
    }

    await comments.deleteOne({_id: comment_id});
    io.emit('delete_comment', comment_id); // Emit comment deletion event

    const Comments = await comments.find({});
    res.status(200).json({comments: Comments});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};

// Like/unlike a comment and emit the event
export const likeComment = async (req, res) => {
  const {user, comment_id} = req.body;

  try {
    const cur = await comments.findById(comment_id);
    if (!cur) {
      return res.status(404).json({message: 'No comment found'});
    }

    const index = cur.likes.indexOf(user);
    if (index === -1) {
      cur.likes.push(user);
    } else {
      cur.likes.splice(index, 1); // Remove user from likes
    }
    await cur.save();

    io.emit('like_comment', {comment_id, user, likes: cur.likes}); // Emit like event

    const Comments = await comments.find({});
    res.status(200).json({comments: Comments});
  } catch (error) {
    res.status(500).json({message: 'Something went wrong!'});
  }
};
