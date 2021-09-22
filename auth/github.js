import GitHubStrategy from 'passport-github2';
GitHubStrategy.Strategy;
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const githubPassport = passport => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.HOST}/auth/github/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('OAuth system has started');
        try {
          const user = await User.findOne({ githubId: profile.id });
          console.log('Searching through users...');
          if (user) {
            done(null, user);
            console.log(
              'Signed in, since there is already an account for this user.'
            );
          } else {
            const newUser = await new User({
              githubId: profile.id,
              displayName: profile.displayName,
              image: profile.photos[0].value,
            }).save();
            if (newUser) {
              done(null, newUser);
              console.log('Created a new user');
            } else {
              console.log('Could not create a new user');
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('deserialize started');
    User.findById(id, (err, user) => {
      if (err) {
        console.log('deserialize error');
        done(null, false, { error: err });
      } else {
        console.log('deserialize successful');
        done(null, user);
      }
    });
  });
};

export default githubPassport;
