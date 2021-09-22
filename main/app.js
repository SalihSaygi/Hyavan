//Server Config
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import { authenticate, initialize, session as _session } from 'passport';
//Routes
import { validLogin } from './validation/sign.validation';
import { ensureUser, ensureGuest, ensureAdmin } from './config/ensureRoles';
import { createUser } from './controllers/userController';
//Helpers
import { notFound, errorHandler } from './helpers/middlewares';
//API
import {
  publicRouter,
  privilegedRouter,
  storeRouter,
  userRouter,
} from './../routes/index';

export const createExpressApp = () => {
  const app = express();
  app.use(json({ limit: '20MB' }));
  app.use(urlencoded({ extended: false }));
  app.use(
    cors({
      origin: process.env.ORIGIN_URL,
    })
  );
  app.use(helmet());
  app.use(morgan('common'));

  app.use('/report', ensureUser, reportRoute);

  app.use('/', ensureGuest, (req, res) => {
    res.send('IT WORKS');
  });

  app.use('/api', privilegedRouter, publicRouter, storeRouter, userRouter);

  app.post(
    '/login',
    ensureGuest,
    validLogin,
    authenticate(['local']),
    function (req, res) {
      res.status(200).json(
        {
          message: 'Login is successful for user with id: ' + req.user.userId,
        },
        req.user
      );
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/dashboard');
    }
  );

  app.get('/logout', ensureUser, function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/register', ensureGuest, createUser);

  app.use(initialize());
  app.use(_session());

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
