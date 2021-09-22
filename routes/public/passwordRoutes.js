import express from 'express';
const passwordRouter = express.Router();
import { forgot, passwordReset } from '../../controllers/passwordController.js';

passwordRouter.post('/forgot', forgot);
passwordRouter.post('/reset', passwordReset);

export default passwordRouter;
