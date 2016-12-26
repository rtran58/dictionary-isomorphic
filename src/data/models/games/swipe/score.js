import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const swipeScoreSchema = mongoose.Schema({
  termId: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  frequency: {
    type: Number,
    required: true,
    default: 1,
  },
});

autoIncrement.initialize(mongoose.connection);
swipeScoreSchema.plugin(autoIncrement.plugin, ('SwipeScore'));
export default mongoose.model('SwipeScore', swipeScoreSchema);
