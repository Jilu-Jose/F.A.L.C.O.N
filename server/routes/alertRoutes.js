import express from 'express';
import { sendFraudAlert } from '../controllers/alertController.js';

const router = express.Router();

router.post('/fraud-alert', sendFraudAlert);

export default router;
