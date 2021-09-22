import express from 'express';
const passportRouter = express.Router();

import passport from 'passport';

passportRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user'] })
);

passportRouter.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login/failed',
    successRedirect: `${process.env.ORIGIN_URL}/profile`,
  })
);

passportRouter.get('/login/success', (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json(req.user);
  }
});

passportRouter.get('/login/failed', (req, res) => {
  res.status(401);
});

passportRouter.get('/logout', function (req, res) {
  req.logout();
  res.redirect(process.env.ORIGIN_URL);
});

export default passportRouter;
