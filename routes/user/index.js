import profileRouter from './profileRoutes.js';
import uploadRouter from './uploadRoutes.js';
import setupRouter from './setupRoutes.js';
import passwordRouter from './passwordRoutes.js';
import express from 'express';
import { ensureAuthUser } from '../../middlewares/authMiddleware.js';
const userRouter = express.Router();

userRouter.use(
  '/user',
  profileRouter,
  setupRouter,
  uploadRouter,
  passwordRouter,
  ensureAuthUser
);

export default userRouter;
