import vaccines from '../models/vaccines.js';
import users_vaccines from '../models/users_vaccines.js';
import dotenv from 'dotenv';
dotenv.config();

export const getGlobalVaccine = async (req, res) => {
    const {vaccine_id, g_type} = req.body;

    try {
        if (!g_type) {
            const result = await vaccines.find({});
            return res.status(200).json({vaccines: result});
        }
        const result = await vaccines.find({vaccine_id});
        if (!result) {
            return res.status(404).json({message: 'Vaccine not found'});
        }

        return res.status(200).json({vaccines: result});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const setVaccine = async (req, res) => {
    const {user_id, vaccine_data} = req.body;

    try {
        const existingVaccine = users_vaccines.find({user_id, name: vaccine_data.name, injection_order: vaccine_data.injection_order});
        if (existingVaccine) {
            return res.status(404).json({message: 'This injection has already existed'});
        }

        const result = await users_vaccines.create({user_id, name: vaccine_data.name,
                                                    injection_order: vaccine_data.injection_order,
                                                    date: vaccine_data.date,
                                                    location: vaccine_data.location});

        res.status(200).json({vaccines: result});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const getVaccine = async (req, res) => {
    const {user_id, name, injection_order, g_type} = req.body;

    try {
        if (!g_type) {
            const result = await users_vaccines.find({user_id});
            return res.status(200).json({vaccines: result});
        }

        const existingVaccine = users_vaccines.find({user_id, name, injection_order});
        if (!existingVaccine) {
            return res.status(404).json({message: 'Injection already existed'});
        }

        return res.status(200).json({vaccines: existingVaccine});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};

export const deleteVaccine = async (req, res) => {
    const {user_id, name, injection_order} = req.body;

    try {
        users_vaccines.deleteOne({user_id, name, injection_order});
        res.status(200).json({deleteVaccine: 1});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
};
