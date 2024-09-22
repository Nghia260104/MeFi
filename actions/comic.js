// import * as TYPES from '../constants/comicTypes.js';
import * as api from '../api/index.js';
import { setComics } from '../reducers/reducers/comics.js';

export const getComics = () => async (dispatch) => {
    try {
        const {data} = await api.getComics();

        await dispatch(setComics(data));
    } catch (error) {
        console.log(error);
    }
};
