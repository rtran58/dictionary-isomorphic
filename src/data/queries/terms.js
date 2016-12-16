import {
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';
import TermsItemType from '../types/TermsItemType';
import TermModel from '../models/term';

/**
 1. insalubrious - unfavorable or promoting to health
 2. diatribes - a forceful or bitter against someone or something
 3. paradox - a statement or proposition that, despite sounding reasonable from acceptable premises,
 leads to a conclusion that is senseless, logically unacceptable, or self-contradictory
 4. xenophobic - having or showing a dislike or fear of people from other countries
 5. hoarsely - sounding rough or harsh, typically as a result of a sore throat or shouting
 6. cultivate - raise or grow (especially) on a large scale
 7. patronage - the support given by a patron
 8. grotesquely - comically or repulsively ugly or distorted
 9. catafalque -  a decorated framework supporting the coffin of a distinguished person at a funeral
 10. dirge - a lament for the dead, especially one forming part of a funeral rite
 11. demur - raise doubts or objections or show reluctance
 12. hearse - a vehicle for conveying the coffin at a funeral
 */
const items = [
  {
    word: 'insalubrious',
    definition: 'unfavorable or promoting to health',
  },
  {
    word: 'diatribes',
    definition: 'a forceful or bitter against someone or something',
  },
  {
    word: 'paradox',
    definition: `a statement or proposition that, despite sounding reasonable from acceptable 
    premises leads to a conclusion that is senseless, logically unacceptable, or 
    self-contradictory`,
  },
];

const terms = {
  type: new List(TermsItemType),
  args: {
    bookId: {
      name: 'bookId',
      type: new NonNull(StringType),
    },
  },
  async resolve(root, params) {
    return await TermModel.find({
      bookId: params.bookId,
    });
  },
};

export default terms;
