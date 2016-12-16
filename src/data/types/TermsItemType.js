import {
  GraphQLObjectType as ObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TermsItemType = new ObjectType({
  name: 'TermsItem',
  fields: {
    _id: { type: IntType },
    bookId: { type: new NonNull(IntType) },
    word: { type: new NonNull(StringType) },
    definition: { type: new NonNull(StringType) },
  },
});

export default TermsItemType;
