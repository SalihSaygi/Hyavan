import express from 'express';
const userDataRouter = express.Router();
import { getUsers, getUserById } from '../controllers/userController.js';
import userRouter from '../user/userRoutes.js';
//Admin Routes

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
//User Routes

export default userDataRouter;
