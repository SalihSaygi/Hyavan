import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      minlength: 7,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 11,
      unique: true,
    },
    currentRank: {
      type: String,
      enum: [
        'Newbie',
        'Animal Lover',
        'Finder of the Losts',
        'Animal Detective',
      ],
      default: 'Newbie',
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'developer', 'animalControl', 'dbModerator'],
      required: true,
    },
    savedAdresses: [
      {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    ],
    numberOfFindings: {
      type: Number,
      required: true,
    },
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
    profilePhoto: {
      data: Buffer,
      contentType: String,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PublicReport',
      },
    ],
    bio: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    phoneActivationNumber: {
      type: String,
      required: true,
    },
    emailActivationNumber: {
      type: String,
      required: true,
    },
    instagramId: {
      type: String,
    },
    twitterId: {
      type: String,
    },
    googleId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const providers = ['google', 'twitter', 'instagram'];

userSchema.pre('validate', function (next) {
  let hasProvider = false;

  const user = this;

  hasProvider = providers.some(provider => user.hasOwnProperty(provider));

  return hasProvider ? next() : next(new Error('No Provider provided'));
});

const User = mongoose.model('User', UserSchema);

export default User;
