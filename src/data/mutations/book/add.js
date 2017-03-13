import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import BookType from '../../types/BookType';
import BookModel from '../../models/book';

const BookAdd = {
  type: BookType,
  description: 'Add new book',
  args: {
    title: {
      name: 'title',
      type: new NonNull(StringType)
    }
  },
  async resolve(root, params) {
    const title = params.title;
    const lastUpdated = Date.now();
    const bookModel = new BookModel({
      title,
      lastUpdated,
    });
    const newBook = await bookModel.save();
    if (!newBook) {
      throw new Error('Error saving new book');
    }
    return newBook.toJSON();
  }
};

export default BookAdd;
