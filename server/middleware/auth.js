import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Ongoing

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        if (token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.PASSWORD_HASH_KEY);
            
        }
    } catch (error) {
        console.log(error);
    }
};
