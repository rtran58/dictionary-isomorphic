import {
  GraphQLList as List
} from 'graphql';

import BookType from '../types/BookType';
import BookModel from '../models/book';

const books = {
  type: new List(BookType),
  async resolve() {
    return await BookModel.find();
  },
};

export default books;
