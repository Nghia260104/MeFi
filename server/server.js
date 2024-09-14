import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRoute from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);

mongoose.connect(process.env.MONGODB_URI, {dbName: 'MeFi'})
    .then(() => {
        app.listen(process.env.PORT, '0.0.0.0',() => console.log('Server is running on port: ${process.env.PORT}'));
        console.log(process.env.PORT);
    })
    .catch((error) => console.log(error.message));

mongoose.set('autoIndex', false);
