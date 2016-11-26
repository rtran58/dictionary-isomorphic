import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TermsItemType = new ObjectType({
  name: 'TermsItem',
  fields: {
    word: { type: new NonNull(StringType) },
    definition: { type: new NonNull(StringType) },
  },
});

export default TermsItemType;
