import express from 'express';
import { ensureGuest } from '../middlewares/authMiddleware.js';

import productRouter from './productRoutes.js';

const storeRouter = express.Router();

storeRouter.use('/store', productRouter);

export default storeRouter;
