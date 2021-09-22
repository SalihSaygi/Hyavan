import express from 'express';
const feedbackRouter = express.Router();

import { admin, dev } from '../../controllers/feedbackController.js';

feedbackRouter.post('/admin', admin);
feedbackRouter.post('/dev', dev);

export default feedbackRouter;
