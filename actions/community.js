import * as api from '../api/index.js';
import { setBlogs, setComments } from '../reducers/slices/communitySlice.js';

export const getBlogs = () => async (dispatch) => {
    try {
        const {data} = await api.getBlogs();

        await dispatch(setBlogs(data));
    } catch (error) {
        console.log(error);
    }
};

export const createBlog = (blog) => async (dispatch) => {
    try {
        const {data} = await api.createBlog(blog);

        await dispatch(setBlogs(data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteBlog = (blog) => async (dispatch) => {
    try {
        const {data} = await api.deleteBlog(blog);

        await dispatch(setBlogs(data));
    } catch (error) {
        console.log(error);
    }
};

export const likeBlog = (blog) => async (dispatch) => {
    try {
        const {data} = await api.likeBlog(blog);

        await dispatch(setBlogs(data));
    } catch (error) {
        console.log(error);
    }
};

export const getComments = () => async (dispatch) => {
    try {
        const {data} = await api.getComments();

        await dispatch(setComments(data));
    } catch (error) {
        console.log(error);
    }
};

export const createComment = (cmt) => async (dispatch) => {
    try {
        const {data} = await api.createComment(cmt);

        await dispatch(setComments(data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = (cmt) => async (dispatch) => {
    try {
        const {data} = await api.deleteComment(cmt);

        await dispatch(setComments(data));
    } catch (error) {
        console.log(error);
    }
};

export const likeComment = (cmt) => async (dispatch) => {
    try {
        const {data} = await api.getComics(cmt);

        await dispatch(setComments(data));
    } catch (error) {
        console.log(error);
    }
};
