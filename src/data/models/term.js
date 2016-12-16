import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const termSchema = new mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

autoIncrement.initialize(mongoose.connection);
termSchema.plugin(autoIncrement.plugin, 'Term');
export default mongoose.model('Term', termSchema);
