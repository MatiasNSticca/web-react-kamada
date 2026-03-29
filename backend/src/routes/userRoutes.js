import express from 'express';
import userController from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/', verifyToken, checkRole(['master_admin', 'admin_medio']), userController.getUsers);
router.get('/:id', verifyToken, userController.getUser);

router.post('/', verifyToken, checkRole(['master_admin']), userController.createUser);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, checkRole(['master_admin']), userController.deleteUser);

router.put('/:id/role', verifyToken, checkRole(['master_admin']), userController.changeUserRole);

router.put('/me/update', verifyToken, userController.updateMyProfile);

export default router;
