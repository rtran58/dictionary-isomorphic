import mongoose from 'mongoose';

const termSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Term', termSchema);
