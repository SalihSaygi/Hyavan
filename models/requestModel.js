import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    animalType: {
      type: Number,
      required: true,
      trim: true,
      select: false,
    },
    animalRace: {
      type: String,
      required: false,
    },
    bounty: {
      type: Number,
      required: true,
      trim: true,
      select: false,
      min: 5,
      max: 100,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    extraInfo: {
      type: String,
      required: false,
      trim: true,
      select: false,
    },
    imageOrVideo: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report',
      },
    ],
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);
const Request = mongoose.model('Request', RequestSchema);

export default Request;
