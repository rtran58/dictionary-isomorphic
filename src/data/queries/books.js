import {
  GraphQLList as List,
  GraphQLString as StringType,
} from 'graphql';

import BookType from '../types/BookType';
import BookModel from '../models/book';

const bookList = {
  type: new List(BookType),
  async resolve() {
    return await BookModel.find();
  },
};

const book = {
  type: BookType,
  args: {
    id: { type: StringType },
  },
  async resolve(root, {id}) {
    return await BookModel.findById(id)
  },
};

export default {
  bookList,
  book,
};
