import express from 'express';
import { roleChecker } from '../middlewares/authMiddleware.js';

import privilegedUsersRouter from './privilegedUsersRoutes.js';
import userDataRouter from './userDataRouter.js';

const privilegedRouter = express.Router();

privilegedRouter.use(roleChecker('privileged', 'developer'));
privilegedRouter.use('/privileged', privilegedUsersRouter, userDataRouter);

export default privilegedRouter;
