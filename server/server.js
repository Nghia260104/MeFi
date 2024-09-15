import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {PORT, MONGODB_URI} from '@env';

import usersRoute from './routes/users';

const app = express();

app.use(cors());

app.use('/users', usersRoute);

mongoose
  .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, '0.0.0.0', () =>
      console.log('Server is running on port: ${PORT}'),
    ),
  )
  .catch(error => console.log(error.message));

mongoose.set('autoIndex', false);
