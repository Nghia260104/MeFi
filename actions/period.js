import * as TYPES from '../constants/periodTypes.js';
import * as api from '../api/index.js';
import {setPeriodRanges, setPeriodTypes} from '../reducers/reducers/period.js';

export const setPeriodRange = (email, startDate, endDate) => async dispatch => {
  try {
    const {data} = await api.setPeriodRange(email, startDate, endDate);
    console.log('data');
    // await dispatch({type: TYPES.PERIOD_TRACKER, data});
    await dispatch(setPeriodRanges(data.startDate, data.endDate));
  } catch (error) {
    console.log(error);
  }
};

export const setPeriodType = (email, p_type) => async dispatch => {
  try {
    const {data} = await api.setPeriodType(email, p_type);

    // await dispatch({type: TYPES.PERIOD_TYPE, data});
    await dispatch(setPeriodTypes(data.p_type));
  } catch (error) {
    console.log(error);
  }
};
