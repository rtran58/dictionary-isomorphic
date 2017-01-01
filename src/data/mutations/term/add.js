import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import TermType from '../../types/TermsItemType';
import TermModel from '../../models/term';

import BookModel from '../../models/book';

const TermAdd = {
  type: TermType,
  description: 'Add new term',
  args: {
    bookId: {
      name: 'bookId',
      type: new NonNull(StringType),
    },
    word: {
      name: 'word',
      type: new NonNull(StringType),
    },
    definition: {
      name: 'definition',
      type: new NonNull(StringType),
    },
  },
  async resolve(root, params) {
    const bookId = params.bookId;
    const book = await BookModel.findById(bookId);

    const termModel = new TermModel({
      word: params.word,
      definition: params.definition,
    });

    const term = await termModel.save();
    console.log(term, term.id);
    book.terms.push(term.id);
    book.lastUpdated = Date.now();

    await book.save();

    return termModel.toJSON();
  },
};

export default TermAdd;
