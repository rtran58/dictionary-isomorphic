import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import ScoreSchema from './score'

const swipeSchema = mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
    required: true
  },
  scores: [ScoreSchema.schema],
});

autoIncrement.initialize(mongoose.connection);
swipeSchema.plugin(autoIncrement.plugin, 'Swipe');
export default mongoose.model('Swipe', swipeSchema);
