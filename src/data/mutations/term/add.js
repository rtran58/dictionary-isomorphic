import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import TermType from '../../types/TermsItemType';
import TermModel from '../../models/term';

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
    const termModel = new TermModel(params);
    const newTerm = await termModel.save();
    if (!newTerm) {
      throw new Error('Error adding new term');
    }
    return newTerm.toJSON();
  },
};

export default TermAdd;
