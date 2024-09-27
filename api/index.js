import axios from 'axios';
import {PORT} from '@env';

// const API = axios.create({baseURL: 'http://localhost:' + (PORT).toString()}); // Own phone
const API = axios.create({baseURL: 'http://192.168.1.41:' + PORT.toString()}); // Set the IP address according to your host device
// const API = axios.create({baseURL: 'http://10.0.2.2:' + (PORT).toString()}); // Android Studio Emulator

// !!!!!!!!!!!!!! REMEMBER ONLY TOGGLE ON OR OFF THE DECLARATION, NOT TO CHANGE ANY LINE ABOVE EXCEPT THE IP ADDRESS IN LINE 2 (LINE 5 IN FILE) !!!!!!!!!!!

// AUTHENTICATION

export const signIn = formData => {
  return API.post('/users/signIn', formData);
};
export const signUp = formData => {
  return API.post('/users/signUp', formData);
};
export const sendCode = email => {
  return API.post('/users/sendCode', {email});
};
export const verify = (email, verifiedCode) => {
  return API.post('/users/verify', {email, verifiedCode});
};
export const checkEmail = (email) => {
  return API.post('/users/checkemail', {email});
};
export const resetPassword = (email, password) => {
  return API.post('/users/resetpassword', {email, password});
};
export const changeName = (email, name) => {
  return API.post('/users/changeName', {email, name});
}

// PERIOD SETTINGS

export const setPeriodRange = (email, startDate, endDate) => {
  return API.post('/users/periodRange', {email, startDate, endDate});
};

export const setPeriodType = (email, p_type) => {
  return API.post('/users/periodType', {email, p_type});
};

// GET COMICS

export const getComics = () => {
  return API.post('/comics');
};

// VACCINES

export const getGlobalVaccine = () => {
  return API.post('/vaccines/getGlobal');
};

export const setVaccine = (user_id, vaccine_data) => {
  return API.post('/vaccines/set', {user_id, vaccine_data});
};

export const getVaccine = (user_id, vaccine_id, g_type) => {
  return API.post('/vaccines/get', {user_id, vaccine_id, g_type});
};

export const deleteVaccine = (user_id, vaccine_id) => {
  return API.post('/vaccines/delete', {user_id, vaccine_id});
};

// COMMUNITY

export const getBlogs = () => {
  return API.post('/community/blogs/get');
};

export const createBlog = (blog) => {
  return API.post('/community/blogs/create', blog);
};

export const deleteBlog = (blog) => {
  return API.post('/community/blogs/delete', blog);
};

export const likeBlog = (blog) => {
  return API.post('/community/blogs/like', blog);
};

export const getComments = () => {
  return API.post('/community/comments/get');
};

export const createComment = (cmt) => {
  return API.post('/community/comments/create', cmt);
};

export const deleteComment = (cmt) => {
  return API.post('/community/comments/delete', cmt);
};

export const likeComment = (cmt) => {
  return API.post('/community/comments/like', cmt);
};
