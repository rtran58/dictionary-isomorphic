import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

const SwipeScoreType = new ObjectType({
  name: 'SwipeScore',
  fields: {
    termId: { type: new NonNull(StringType) },
    score: { type: new NonNull(StringType) },
    frequency: { type: new NonNull(StringType) },
  },
});

export default SwipeScoreType;
