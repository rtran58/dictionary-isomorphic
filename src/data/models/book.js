import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

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

autoIncrement.initialize(mongoose.connection);
bookSchema.plugin(autoIncrement.plugin, 'Book');
export default mongoose.model('Book', bookSchema);
