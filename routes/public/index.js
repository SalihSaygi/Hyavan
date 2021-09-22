import express from 'express';
import { ensureGuest } from '../middlewares/authMiddleware.js';

import localRouter from './localRoutes';
import passwordRouter from './passwordRoutes.js';

const publicRouter = express.Router();

publicRouter.use(ensureGuest);
publicRouter.use('/public', localRouter, passwordRouter);

export default publicRouter;
