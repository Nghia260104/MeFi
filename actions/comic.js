import * as TYPES from '../constants/comicTypes.js';
import * as api from '../api/index.js';

export const getComics = () => async (dispatch) => {
    try {
        const {data} = await api.getComics();

        await dispatch({type: TYPES.IMAGE, data});
    } catch (error) {
        console.log(error);
    }
};
