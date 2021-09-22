import express from 'express';
const passwordRouter = express.Router();
import { changePass } from '../../controllers/passwordController.js';

passwordRouter.post('/change', changePass);

export default passwordRouter;
