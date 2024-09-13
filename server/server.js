import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRoute from './routes/users';

const app = express();

app.use(cors());

app.use('/users', usersRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('Server is running on port: ${PORT}')))
    .catch((error) => console.log(error.message));

mongoose.set('autoIndex', false);
