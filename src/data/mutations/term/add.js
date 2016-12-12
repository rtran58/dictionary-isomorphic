import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringObject,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import TermType from '../../types/TermsItemType';
import TermModel from '../../models/term';

export default {
  type: TermType,
  description: 'Add new term',
  args: {
    word: {
      name: 'word',
      type: new NonNull(StringObject),
    },
    definition: {
      name: 'definition',
      type: new NonNull(StringObject),
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
