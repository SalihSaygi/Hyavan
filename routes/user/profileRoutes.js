import express from 'express';
const profileRouter = express.Router();
import {
  getUserById,
  getUserProfile,
  getUserFriends,
} from '../../controllers/userController.js';
import { ensureAuthUser } from '../../middlewares/authMiddleware.js';
userRouter.use(ensureAuthUser);
userRouter.get('/id/:id', getUserById);
userRouter.get('/profile', getUserProfile);
userRouter.get('/friends', getUserFriends);

export default profileRouter;
