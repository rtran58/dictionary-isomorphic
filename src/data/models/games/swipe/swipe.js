import mongoose from 'mongoose';

import ScoreSchema from './score'

const swipeSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true
  },
  scores: [ScoreSchema.schema],
});

export default mongoose.model('Swipe', swipeSchema);
