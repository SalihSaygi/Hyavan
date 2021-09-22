import mongoose from 'mongoose';

const PrivilegedSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    githubId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Privileged = mongoose.model('Privileged', PrivilegedSchema);

export default Privileged;
