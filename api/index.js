import axios from 'axios';
import {PORT} from '@env';

const API = axios.create({baseURL: 'https://localhost:' + (PORT).toString()}); // Own phone
// const API = axios.create({baseURL: 'https://10.0.2.2:' + (.PORT).toString()}); // Android Studio Emulator

export const signIn = (formData) => {
    return API.post('/users/signIn', formData);
};
export const signUp = (formData) => {
    return API.post('/users/signUp', formData);
};
export const sendCode = (email) => {
    return API.post('/users/sendCode', {email});
};
export const verify = (email, verifiedCode) => {
    return API.post('/users/verify', {email, verifiedCode});
};
