import mongoose from 'mongoose';

const PublicReportSchema = mongoose.Schema(
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
    favoredDonate: {
      type: Number,
      required: false,
      min: 10,
      max: 500,
      default: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    latitude: {
      type: Number,
      required: true,
      trim: true,
    },
    longtitude: {
      type: Number,
      required: true,
      trim: true,
    },
    explanation: {
      type: String,
      required: false,
      trim: true,
      select: false,
      default: '',
    },
    imageOrVideo: {
      data: Buffer,
      contentType: String,
      default: '',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: false,
        default: [],
      },
    ],
    reportedBy: { required: true, type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const PublicReport = mongoose.model('PublicReport', PublicReportSchema);

export default PublicReport;
