import LocalStrategy from 'passport-local';
LocalStrategy.Strategy
import Privileged from '../models/privilegedModel.js'
import bcrypt from bcryptjs
import dotenv from 'dotenv'
dotenv.config()

//Just Login 
export const localPassport = (passport) => {
  passport.use(
    {
    usernameField: 'email',
    passwordField: 'password'
    },
    new LocalStrategy((username, password, done) => {
      // Match user
      Privileged.findOne({
        email: username
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'No user is registered with email: ' + username });
        }

        // Match password
        bcrypt.compareSync(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            if (user.activated) {
              return done(null, user);
            } else {
              return done(null, false, { message: "User is not activated by email: " + username });
            }
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};