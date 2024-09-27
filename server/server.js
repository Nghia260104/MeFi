import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import usersRoute from './routes/users.js';
import comicRoute from './routes/comics.js';
import vaccineRoute from './routes/vaccines.js';
import communityRoute from './routes/community.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/comics', comicRoute);
app.use('/vaccines', vaccineRoute);
app.use('/community', communityRoute);

mongoose.connect(process.env.MONGODB_URI, {dbName: 'MeFi'})
    .then(() => {
        app.listen(process.env.PORT, '0.0.0.0',() => console.log(`Server is running on port: ${process.env.PORT}`));
        console.log(process.env.PORT);
    })
    .catch((error) => console.log(error.message));

mongoose.set('autoIndex', false);

// mongoose.connect(process.env.MONGODB_URI, {dbName: 'MeFi'});
// mongoose.set('autoIndex', false);

// import vaccines from './models/vaccines.js';

// const main = async () => {
//     var name = ['', 'Influvac Tetra/ Vaxigrip Tetra', 'MMR II/MMRI/Priorix', 'Varivax/ Varilrix/ Varicella',
//         'Adacel', 'Boostrix', 'Engerix B', 'Twinrix', 'VAT', 'Gardasil/ Gardasil 9', 'Prevenar-13', 'Menactra'];
//     var prevention = [[], ['Flu'], ['Measles', 'Mumps', 'Rubella'], ['Chickenpox'], 
//     ['Whooping Cough', 'Diphtheria', 'Tetanus'], ['Whooping Cough', 'Diphtheria', 'Tetanus'],
//     ['Hepatitis B'], ['Hepatitis A', 'Hepatitis B'], ['Tetanus'], ['Cervical cancer', 'HPV infection'],
//     ['Pneumococcus infection'], ['Neisseria meningitidis A, C, Y, W']];
//     for (let i = 1; i <= 11; ++i) {
//         vaccines.create({name: name[i], prevention: prevention[i], origin: 'Vietnam'});
//     }
// };

// // Run the main function

// main();

