import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'bug',
        'bad behavior',
        'scam',
        'suggestion',
        'accountFix',
        'misunderstanding',
      ],
    },
    byWho: {},
    thanks: {
      type: Number,
      required: true,
      default: 0,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

export default Feedback;
