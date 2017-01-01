import mongoose from 'mongoose';

import TermModel from './term';

const bookSchema = new mongoose.Schema({
  id: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  terms: {
    type: [mongoose.Schema.Types.ObjectId],
  }
});

export default mongoose.model('Book', bookSchema);
