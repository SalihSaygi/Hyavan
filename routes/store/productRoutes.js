import express from 'express';
const productRouter = express.Router();
import {
  getProductById,
  getProfileProducts,
  createProduct,
  getProfileProducts,
} from '../../controllers/productController.js';
import {
  roleChecker,
  isProductOwner,
} from '../../middlewares/authMiddleware.js';

productRouter.use(roleChecker('admin', 'developers', 'sellers'));
productRouter.get('/product/:id', getProductById, isProductOwner);
productRouter.get('/profile', getProfileProducts);
productRouter.post('/', createProduct);
productRouter.put('/product/:id', isProductOwner);

export default productRouter;
