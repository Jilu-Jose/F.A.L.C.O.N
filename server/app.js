import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js';
import alertRoutes from './routes/alertRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(morgan('dev'));

// Test Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'FALCON Server is running.' });
});

// Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/fraud', fraudRoutes);
app.use('/api/alert', alertRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
