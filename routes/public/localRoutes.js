import express from 'express';
const localRouter = express.Router();

localRouter.post('/login', (req, res, next) => {
  req.session.destroy();
  passport.authenticate('local', {
    successRedirect: '/admin/login/success',
    failureRedirect: '/admin/login/failed',
  });
});

localRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${req.hostname}/dashboard`);
});

localRouter.get('/login/success', (req, res) => {
  if (req.user && req.session) {
    res.status(200).json(req.user);
  }
});

// when login failed, send failed msg
localRouter.get('/login/failed', (req, res) => {
  res.status(401);
});

export default localRouter;
