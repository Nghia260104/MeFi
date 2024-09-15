import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API = axios.create({baseURL: 'https://localhost:' + (process.env.PORT).toString()});

export const signIn = (formData) => API.post('users/signIn', formData);
export const signUp = (formData) => API.post('users/signUp', formData);
export const sendCode = (email) => API.post('users/sendCode', email);
export const verify = (email, verifiedCode) => API.post('users/verify', {email, verifiedCode});
