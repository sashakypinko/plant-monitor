import express from "express";
import { getMonitors, updateMonitor } from '../controllers/monitor-controller.js';

const router = express.Router();

router.get('/', getMonitors);
router.post('/:id', updateMonitor);

export default router;