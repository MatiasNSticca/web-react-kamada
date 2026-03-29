import express from 'express';
import productController from '../controllers/productController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

router.post('/', verifyToken, checkRole(['master_admin', 'admin_medio']), productController.createProduct);
router.put('/:id', verifyToken, checkRole(['master_admin', 'admin_medio']), productController.updateProduct);
router.delete('/:id', verifyToken, checkRole(['master_admin', 'admin_medio']), productController.deleteProduct);

export default router;
