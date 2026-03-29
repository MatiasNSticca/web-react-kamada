import express from 'express';
import categoryController from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);

router.post('/', verifyToken, checkRole(['master_admin']), categoryController.createCategory);
router.put('/:id', verifyToken, checkRole(['master_admin']), categoryController.updateCategory);
router.delete('/:id', verifyToken, checkRole(['master_admin']), categoryController.deleteCategory);

export default router;
