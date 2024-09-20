import comics from '../models/comics.js';
import dotenv from 'dotenv';
dotenv.config();

export const getComics = async (req, res) => {
    try {
        const result = await comics.find({});
        res.status(200).json({comics: result});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};
