import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as List,
} from 'graphql';

import TermType from './TermsItemType';

const BookType = new ObjectType({
  name: 'BookType',
  fields: {
    _id: {
      type: IntType,
    },
    title: {
      type: new NonNull(StringType),
    },
    terms: {
      type: new List(TermType)
    }
  },
});

export default BookType;
