import axios from 'axios';
import {PORT} from '@env';

// const API = axios.create({baseURL: 'https://localhost:' + (process.env.PORT).toString()});
const API = axios.create({baseURL: 'http://192.168.1.41:' + (PORT).toString()}); // Android Studio emulator, if it is your phone
// you need to change to http://localhost:, remember to connect the same network

export const signIn = (formData) => {
    return API.post('/users/signIn', formData);
};
export const signUp = (formData) => {
    console.log(`API: You have just click the SignUp Button right?`);
    return API.post('/users/signUp', formData);
};
export const sendCode = (email) => {
    return API.post('/users/sendCode', email);
};
export const verify = (email, verifiedCode) => {
    return API.post('/users/verify', {email, verifiedCode});
};
