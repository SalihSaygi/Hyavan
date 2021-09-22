import express from 'express';
const reportRouter = express.Router();

import { admin, dev } from '../../controllers/emailController.js';

reportRouter.post('/admin', admin);
reportRouter.post('/dev', dev);

export default reportRouter;
