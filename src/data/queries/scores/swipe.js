import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import TermModel from '../../models/term';
import SwipeModel from '../../models/games/swipe/swipe';
import SwipeScoreModel from '../../models/games/swipe/score';
import SwipeType from '../../types/SwipeType';

function batchUpdate(swipe, terms) {
  const result = [];
  const map = {};
  let i;

  if (swipe.length > 0) {
    const scores = swipe.scores;
    for(i=0; i<scores.length; i++) {
      map[scores[i].termId] = scores[i];
      map[scores[i].termId].count = -1;
    }
  }

  for(i=0; i<terms.length; i++) {
    if (map[terms[i]._id]) {
      map[terms[i]._id].count++;
    } else {
      map[terms[i]._id] = { count: 1 };
    }
  }

  const keys = Object.keys(map);
  for(i=0; i<keys.length; i++) {
    if (map[keys[i]].count === 0) {
      result.push(new SwipeScoreModel({
        termId: keys[i],
        score: map[keys[i]].score,
        frequency: map[keys[i]].frequency,
      }));
    } else {
      result.push(new SwipeScoreModel({
        termId: keys[i],
        score: 0,
        frequency: 1,
      }));
    }
  }

  return result;
}

function createScores(terms) {
  const result = [];
  for(let i=0; i<terms.length; i++) {
    result.push(new SwipeScoreModel({
      termId: terms._id,
      score: 0,
      frequency: 1,
    }));
  }
  return result;
}

const swipe = {
  type: SwipeType,
  args: {
    bookId: {
      name: 'bookId',
      type: new NonNull(StringType),
    }
  },
  async resolve(root, params) {
    const bookId = params.bookId;
    const swipe = await SwipeModel.find({
      bookId: parseInt(params.bookId)
    });

    const terms = await TermModel.find({
      bookId: parseInt(params.bookId)
    });

    if (!swipe.length || terms.lastUpdated > swipe.lastUpdated) {
      const scores = batchUpdate(swipe, terms);
      const swipeModel = new SwipeModel({
        bookId: params.bookId,
        scores: scores,
      });

      return await swipeModel.save();
    } else {
      return swipe[0];
    }
  },
};

export default swipe;
