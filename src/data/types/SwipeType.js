import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLList as List,
} from 'graphql';

import ScoreType from './SwipeScoreType';

const SwipeType = new ObjectType({
  name: 'Swipe',
  fields: {
    _id: { type: new NonNull(StringType) },
    bookId: { type: new NonNull(StringType) },
    lastUpdated: { type: new NonNull(StringType) },
    scores: { type: new List(ScoreType) },
  }
});

export default SwipeType;
