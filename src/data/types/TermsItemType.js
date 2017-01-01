import {
  GraphQLObjectType as ObjectType,
  GraphQLID as IDType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const TermsItemType = new ObjectType({
  name: 'TermsItem',
  fields: {
    id: { type: new NonNull(StringType) },
    word: { type: new NonNull(StringType) },
    definition: { type: new NonNull(StringType) },
  },
});

export default TermsItemType;
