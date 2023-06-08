import express from 'express';
const router = express.Router();

import {newDevice} from '../controllers/devicesController.js'

router.post('/:_id', newDevice);

export default router;