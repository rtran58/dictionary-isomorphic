import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  terms: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Term'
  }
});

export default mongoose.model('Book', bookSchema);
