import * as TYPES from '../constants/actionTypes.js';
import * as api from '../api/index.js';

export const getGlobalVaccine = (vaccine_id, g_type) => async (dispatch) => {
    try {
        const {data} = await api.getGlobalVaccine(vaccine_id, g_type);

        await dispatch({type: TYPES.GLOBAL_VACCINES, data});
    } catch (error) {
        console.log(error);
    }
};

export const setVaccine = (user_id, vaccine_data) => async (dispatch) => {
    try {
        const {data} = await api.setVaccine(user_id, vaccine_data);

        await dispatch({type: TYPES.SET_VACCINE, data});
    } catch (error) {
        console.log(error);
    }
};

export const getVaccine = (user_id, name, injection_order, g_type) => async (dispatch) => {
    try {
        const {data} = await api.getVaccine(user_id, name, injection_order, g_type);

        await dispatch({type: TYPES.GET_VACCINE, data});
    } catch (error) {
        console.log(error);
    }
};

export const deleteVaccine = (user_id, name, injection_order) => async (dispatch) => {
    try {
        const {data} = await api.deleteVaccine(user_id, name, injection_order);

        await dispatch({type: TYPES.DELETE_VACCINE, data});
    } catch (error) {
        console.log(error);
    }
};
