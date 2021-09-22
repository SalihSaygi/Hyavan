import mongoose from 'mongoose';

const ConferenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Education', 'News', 'Update', 'Chit-Chat'],
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conference = mongoose.model('Conference', ConferenceSchema);

export default Conference;
