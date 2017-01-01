import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLList as List,
} from 'graphql';

import TermType from './TermsItemType';

const BookType = new ObjectType({
  name: 'BookType',
  fields: {
    _id: {
      type: new NonNull(IDType),
    },
    lastUpdated: {
      type: new NonNull(StringType,)
    },
    title: {
      type: new NonNull(StringType),
    },
    terms: {
      type: new List(TermType)
    },
  },
});

export default BookType;
