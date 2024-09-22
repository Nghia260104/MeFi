// import * as TYPES from '../constants/actionTypes.js';
import * as api from '../api/index.js';
import { getGlobalVaccines, setVaccines } from '../reducers/reducers/vaccines.js';

export const getGlobalVaccine = () => async (dispatch) => {
    try {
        const {data} = await api.getGlobalVaccine();

        await dispatch(getGlobalVaccines(data));
    } catch (error) {
        console.log(error);
    }
};

export const setVaccine = (user_id, vaccine_data) => async (dispatch) => {
    try {
        const {data} = await api.setVaccine(user_id, vaccine_data);

        await dispatch(setVaccines(data));
    } catch (error) {
        console.log(error);
    }
};

export const getVaccine = (user_id, name, injection_order, g_type) => async (dispatch) => {
    try {
        const {data} = await api.getVaccine(user_id, name, injection_order, g_type);

        await dispatch(setVaccines(data));
    } catch (error) {
        console.log(error);
    }
};

export const deleteVaccine = (user_id, name, injection_order) => async (dispatch) => {
    try {
        const {data} = await api.deleteVaccine(user_id, name, injection_order);

        await dispatch(setVaccines(data));
    } catch (error) {
        console.log(error);
    }
};
