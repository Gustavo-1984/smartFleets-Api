import express from 'express';
const router = express.Router();

import {newAlarm} from '../controllers/alarmController.js'

router.post('/', newAlarm);

export default router;