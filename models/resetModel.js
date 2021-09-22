import Mongoose from 'mongoose';
import { randomBytes, createHmac, timingSafeEqual } from 'crypto';
import {
  PASSWORD_RESET_BYTES,
  PASSWORD_RESET_TIMEOUT,
} from '../config/password.js';
import { APP_ORIGIN, APP_SECRET } from '../config/app.js';

const passwordResetSchema = new Mongoose.Schema(
  {
    userId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    token: { type: String, required: true },
    expiredAt: Date,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

passwordResetSchema.pre('save', function () {
  console.log(this.token);
  if (this.isModified('token')) {
    this.token = PasswordReset.hashedToken(this.token);
    console.log(this.token);
  }

  if (!this.expiredAt) {
    this.expiredAt = new Date(new Date().getTime() + PASSWORD_RESET_TIMEOUT);
  }
});

passwordResetSchema.methods.url = function (plaintextToken) {
  return `
    Click this to reset your password
    ${APP_ORIGIN}/reset/?id=${this.id}&token=${plaintextToken}
    This token will expire in 1 hour. (${this.expiredAt})
    If you did not request this, please ignore this email and your password will remain unchanged.
  `;
};

passwordResetSchema.methods.isValid = function (plaintextToken) {
  const hash = PasswordReset.hashedToken(plaintextToken);
  return (
    timingSafeEqual(Buffer.from(hash), Buffer.from(this.token)) &&
    this.expiredAt > new Date()
  );
};

passwordResetSchema.statics.plaintextToken = () => {
  return randomBytes(PASSWORD_RESET_BYTES).toString('hex');
};

passwordResetSchema.statics.hashedToken = plaintextToken => {
  return createHmac('sha256', APP_SECRET).update(plaintextToken).digest('hex');
};

export const PasswordReset = Mongoose.model(
  'PasswordReset',
  passwordResetSchema
);
