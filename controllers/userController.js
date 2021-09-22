import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { sessionizeUser } from '../helpers/middlewares.js';
import { clearKey } from '../services/cache.js';
import { PasswordReset } from '../models/resetModel.js';

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "Couldn't find the user with id: " + req.params.userId,
        });
      }
      res.status(200).json({
        message: 'Deleted the user with id: ' + req.params.userId,
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "Couldn't delete user because of error: " + err,
      });
    });
};

const createUser = (req, res) => {
  if (Object.values(req.body)) {
    return res.status(400).json({
      message: 'Fill in the required fields',
    });
  }
  const user = new User({
    nickname: req.body.nickname,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    currentRank: req.body.currentRank,
    role: req.body.role,
    address: req.body.adress,
    numberOfFindings: req.body.numberOfFindings,
    profilePhoto: req.body.profilePhoto,
    age: req.body.age,
    pronoun: req.body.pronoun,
    bio: req.body.bio,
  });

  const sessionUser = sessionizeUser(user);
  req.session.user = sessionUser;

  user
    .save()
    .then(data => {
      const passwordReset = new PasswordReset({
        _userId: user._id,
        passwordReset: crypto.randomBytes(16).toString('hex'),
      });
      passwordReset.save().then(err => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        // Send email (use credintials of SendGrid)
        var transporter = nodemailer.createTransport({
          service: 'Sendgrid',
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
          },
        });
        var mailOptions = {
          from: 'no-reply@example.com',
          to: user.email,
          subject: 'Account Verification Link',
          text:
            'Hello ' +
            req.body.name +
            ',\n\n' +
            'Please verify your account by clicking the link: \nhttp://' +
            req.headers.host +
            '/confirmation/' +
            user.email +
            '/' +
            passwordReset.passwordReset +
            '\n\nThank You!\n',
        };
        transporter.sendMail(mailOptions).then(err => {
          if (err) {
            return res.status(500).send({
              msg: 'Technical Issue!, Please click on resend for verify your Email.',
            });
          }
          res.json(data);
        });
      });
    })
    .catch(err => {
      res.status(500).json({
        // eslint-disable-next-line no-useless-escape
        message:
          err.message || "Couldn't save the User for some reason  ¯_(ツ)_/¯",
      });
    });
};

const updateUser = (req, res) => {
  if (Object.values(req.body)) {
    return res.status(400).json({
      message: 'Fill in the required fields',
    });
  }
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "Couldn't find the user with id: " + req.params.userId,
        });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      return res.status(200).json({
        message:
          err +
          "\n| Found it but couldn't retrieve the user with id: " +
          req.params.userId +
          ' |',
      });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .sort({ nickname: -1 })
    .lean()
    .limit(20)
    .cache({ time: 10 })
    .then(users => {
      res.status(200).json(
        {
          message: 'Here is all users',
        },
        users
      );
      console.log(users);
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯",
      });
    });
};

const getUserById = (req, res) => {
  console.log(populateFields);
  if (req.body.populateFields == true) {
    User.findById(req.params.userId)
      .populate(req.body.populateFields)
      .lean()
      .cache()
      .then(user => {
        if (user) {
          res.status(200).json({
            message: 'Here is the user with id: ' + req.params.userId,
            githubId: user.githubId,
            displayName: user.displayName,
            image: user.image,
            hasBots: user.hasBots,
          });
        } else {
          res.status(404).json({
            message: "Couldn't find the user with id: " + req.params.userId,
          });
          throw new Error('User not found');
        }
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯",
        });
      });
  } else {
    User.findById(req.params.userId)
      .lean()
      .cache()
      .then(user => {
        if (user) {
          res.status(200).json({
            message: 'Here is the user with id: ' + req.params.userId,
            githubId: user.githubId,
            displayName: user.displayName,
            image: user.image,
            hasBots: user.hasBots,
          });
        } else {
          res.status(404).json({
            message: "Couldn't find the user with id: " + req.params.userId,
          });
          throw new Error('User not found');
        }
      })
      .catch(err => {
        res.status(500).json({
          message:
            err.message || "Couldn't get Users for some reason ¯\\_(ツ)_/¯",
        });
      });
  }
};

const getUserProfile = asyncHandler(async (req, res) => {
  console.log(req.user.id);
  const user = await User.findById(req.user.id);
  console.log(user);
  if (user) {
    res.status(200).json({
      message: 'Here is you with id: ' + req.params.userId,
      githubId: user.githubId,
      displayName: user.displayName,
      image: user.image,
      hasBots: user.hasBots,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserFriends = (req, res) => {
  User.findById(req.user.id).then(user => {
    user;
  });
};

export {
  getUsers,
  getUserById,
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
};
