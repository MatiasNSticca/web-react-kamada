import express from 'express';
import eventController from '../controllers/eventController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);

router.post('/', verifyToken, checkRole(['master_admin', 'admin_medio']), eventController.createEvent);
router.put('/:id', verifyToken, checkRole(['master_admin', 'admin_medio']), eventController.updateEvent);
router.delete('/:id', verifyToken, checkRole(['master_admin', 'admin_medio']), eventController.deleteEvent);

export default router;
