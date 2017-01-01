import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import BookModel from '../../models/book';
import TermModel from '../../models/term';
import SwipeModel from '../../models/games/swipe/swipe';
import SwipeScoreModel from '../../models/games/swipe/score';
import SwipeType from '../../types/SwipeType';

function batchUpdate(swipe, terms) {
  const result = [];
  const map = {};
  let i;

  if (swipe) {
    const scores = swipe.scores;
    for(i=0; i<scores.length; i++) {
      map[scores[i].termId] = scores[i];
      map[scores[i].termId].count = -1;
    }
  }

  for(i=0; i<terms.length; i++) {
    if (map[terms[i].id]) {
      map[terms[i].id].count++;
    } else {
      map[terms[i].id] = { count: 1 };
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
    const swipe = await SwipeModel.findOne({
      bookId: bookId
    });

    const book = await BookModel.findById(bookId);

    const terms = await TermModel.find({
      _id: {
        $in: book.terms
      }
    });

    if (!swipe || swipe.lastUpdated < book.lastUpdated) {
      const scores = batchUpdate(swipe, terms);
      const swipeModel = new SwipeModel({
        bookId: params.bookId,
        scores: scores,
      });

      return await swipeModel.save();
    } else {
      return swipe;
    }
  },
};

export default swipe;
