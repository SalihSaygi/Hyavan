import mongoose from 'mongoose';

const PrivateReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    animalType: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    animalRace: {
      type: String,
      required: false,
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
    },
    imageOrVideo: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    forWho: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const PrivateReport = mongoose.model('PrivateReport', PrivateReportSchema);

export default PrivateReport;
