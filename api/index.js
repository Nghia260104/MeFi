/* eslint-disable no-extra-parens */
/*prettier-ignore */
import axios from 'axios';
import {PORT} from '@env';

// const API = axios.create({baseURL: 'http://localhost:' + (PORT).toString()}); // Own phone
const API = axios.create({baseURL: 'http://192.168.1.14:' + PORT.toString()}); // Set the IP address according to your host device
//const API = axios.create({baseURL: 'http://10.0.2.2:' + PORT.toString()}); // Android Studio Emulator

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

// PERIOD SETTINGS

export const setPeriodRange = (email, startDate, endDate) => {
  return API.post('/users/setPeriodRange', {email, startDate, endDate});
};

export const setPeriodType = (email, p_type) => {
  return API.post('/users/setPeriodType', {email, p_type});
};
