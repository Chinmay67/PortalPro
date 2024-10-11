import express from 'express';
import { fetchLogs } from '../controller/log.controller.js'
import verifyJWT from '../middleware/auth.middlewares.js'

const router = express.Router();

// Admin-only route to fetch logs
router.get('/logs', verifyJWT, fetchLogs);

export default router;
