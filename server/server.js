// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {Server} from 'socket.io';
import http from 'http'; // Use this to integrate with Socket.IO
dotenv.config();

import usersRoute from './routes/users.js';
import comicRoute from './routes/comics.js';
import vaccineRoute from './routes/vaccines.js';
import communityRoute from './routes/community.js';
import commentRoute from './routes/comment.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Be more specific in production
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/comics', comicRoute);
app.use('/vaccines', vaccineRoute);
app.use('/community', communityRoute);
app.use('/comment', commentRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {dbName: 'MeFi'})
  .then(() => {
    server.listen(process.env.PORT, '0.0.0.0', () =>
      console.log(`Server running on port: ${process.env.PORT}`),
    );
  })
  .catch(error => console.log(error.message));

// Socket.IO Connection
io.on('connection', socket => {
  console.log('New client connected:', socket.id);

  // Event for new blog post
  socket.on('new_post', post => {
    io.emit('update_posts', post); // Emit the new post to all connected clients
  });

  // Event for new comment or like
  socket.on('new_interaction', update => {
    io.emit('update_interactions', update); // Emit the interaction update
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Export the Socket.IO instance for use in other modules
export {io};
