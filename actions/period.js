import * as TYPES from '../constants/periodTypes.js';
import * as api from '../api/index.js';
import { setSlicePeriodRange, setSlicePeriodType } from '../reducers/slices/periodSlice.js';

export const setPeriodRange = (email, startDate, endDate) => async (dispatch) => {
    try {
        const {data} = await api.setPeriodRange(email, startDate, endDate);

        await dispatch({type: TYPES.PERIOD_TRACKER, data});
        await dispatch(setSlicePeriodRange(startDate, endDate));
    } catch (error) {
        console.log(error);
    }
};

export const setPeriodType = (email, p_type) => async (dispatch) => {
    try {
        const {data} = await api.setPeriodType(email, p_type);

        await dispatch({type: TYPES.PERIOD_TYPE, data});
        await dispatch(setSlicePeriodType(p_type));
    } catch (error) {
        console.log(error);
    }
};
