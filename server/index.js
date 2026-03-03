import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { Server } from 'socket.io';
import setupSocket from './sockets/socketHandler.js';
import logger from './utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

setupSocket(io);
app.set('io', io); // Make io accessible in routes

const PORT = process.env.PORT || 5000;

// Connect to DB and Start Server
connectDB().then(() => {
    server.listen(PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}).catch(err => {
    logger.error('Failed to connect to database', err);
    process.exit(1);
});
