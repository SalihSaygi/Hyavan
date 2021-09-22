import asyncHandler from 'express-async-handler';
import Privileged from '../models/privilegedModel.js';
import bcrypt from 'bcryptjs';

const admin = asyncHandler(async (req, res, next) => {
  const exists = await Privileged.exists({ username: 'admin' });

  if (exists) {
    console.log('Admin Exists');
    res.status(400);
    res.redirect('/');
    return;
  }

  const EMAIL = process.env.ADMIN_EMAIL;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(process.env.ADMIN_PASS, salt, function (err, hash) {
      if (err) return next(err);

      const newAdmin = new Privileged({
        username: 'admin',
        email: EMAIL,
        hash: hash,
        salt: salt,
        role: 'admin',
      });

      newAdmin.save().then(user => {
        console.log(user);
      });

      res.status(201);
    });
  });
});

const dev = asyncHandler(async (req, res, next) => {
  await Privileged.countDocuments({ roles: 'dev' }, function (err, count) {
    if (err) return next(err);
    if (count > 5) {
      res.redirect('/login');
    }
  });

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) return next(err);

      const newDev = new Privileged({
        username: req.body.username,
        email: req.body.email,
        hash: hash,
        salt: salt,
        role: 'developer',
      });

      newDev.save().then(user => {
        console.log(user);
      });

      res.status(201);
    });
  });
});

export { admin, dev };
