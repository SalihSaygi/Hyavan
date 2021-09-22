import Privileged from '../models/privilegedModel.js';
import { PasswordReset } from '../models/resetModel.js';
import passportLocalMongoose from 'passport-local-mongoose';
import { sendEmail } from '../Gmail.js';
import { resetPassword } from '../helper/resetPass.js';

const forgot = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = Privileged.findOne({ email });
  if (!user) {
    res.status(400);
    console.log('No user with that email');
    throw new Error('No user with that email');
    return;
  }
  let token;
  try {
    token = await PasswordReset.plaintextToken();
  } catch {
    console.log('That did not go well.');
  }
  console.log(token);
  let reset;
  try {
    reset = await PasswordReset.create({ userId: user.id, token });
  } catch {
    console.log('That also did not go well.');
  }
  console.log(reset);
  const fromEmail = process.env.EMAIL;
  console.log(fromEmail);
  sendEmail({
    from: fromEmail,
    to: email,
    subject: 'KibbleBot Password Reset',
    text: reset.url(token),
  });
  res.status(201);
};

const passwordReset = async ({ query, body }, res) => {
  const { id, token } = query;
  const { password } = body;
  console.log(password);
  const reset = await PasswordReset.findById(id);
  console.log(reset);

  if (!reset) {
    throw new Error('Invalid password reset token');
  }
  let user;

  await Promise.all([
    resetPassword(user, password),
    PasswordReset.deleteMany({ userId: reset.userId }),
  ]);
  const fromEmail = process.env.EMAIL;

  await sendMail({
    from: fromEmail,
    to: user.email,
    subject: 'Password reset',
    text: 'Your password was successfully reset',
  });

  res.json({ message: 'OK' });
};

const changePass = (req, res) => {
  Privileged.findOne({ _id: req.user.id }, (err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        user.changePassword(
          req.body.oldpassword,
          req.body.newpassword,
          function (err) {
            if (err) {
              if (err.name === 'IncorrectPasswordError') {
                res.json({ success: false, message: 'Incorrect password' }); // Return error
              } else {
                res.json({
                  success: false,
                  message:
                    'Something went wrong!! Please try again after sometimes.',
                });
              }
            } else {
              res.json({
                success: true,
                message: 'Your password has been changed successfully',
              });
            }
          }
        );
      }
    }
  });
};

export { forgot, passwordReset, changePass };
