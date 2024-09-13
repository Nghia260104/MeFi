import * as TYPES from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const signIn = (formData) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);

        dispatch({type: TYPES.AUTH, data});
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (formData) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);

        dispatch({type: TYPES.AUTH, data});
    } catch (error) {
        console.log(error);
    }
};

export const sendCode = (email) => async (dispatch) => {
    try {
        const {data} = await api.sendCode(email);

        dispatch({type: TYPES.SEND_CODE, data});
    } catch (error) {
        console.log(error);
    }
};

export const verify = (email, verifiedCode) => async (dispatch) => {
    try {
        const {data} = await api.verify(email, verifiedCode);

        dispatch({type: TYPES.VERIFY, data});
    } catch (error) {
        console.log(error);
    }
};
