import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import TermType from '../../types/TermsItemType';
import TermModel from '../../models/term';

import BookModel from '../../models/book';

import fetch from '../../../core/fetch';

const TermAdd = {
  type: TermType,
  description: 'Add new term',
  args: {
    bookId: {
      name: 'bookId',
      type: new NonNull(StringType),
    },
    word: {
      name: 'word',
      type: new NonNull(StringType),
    },
  },
  async resolve(root, params) {
    const DEFINITION_NOT_FOUND = 'A definition for this word was not found.';

    const bookId = params.bookId;
    const book = await BookModel.findById(bookId);
    const word = params.word;
    let definition;
    let newTerm;

    const DICTIONARY_API_APP_ID = '05ed1f72';
    const DICTIONARY_API_APP_KEY = 'dce698373900e5357bda7aa6d3ee2a0d';
    const DICTIONARY_API_LANG = 'en';
    const url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + DICTIONARY_API_LANG + '/' + encodeURIComponent(word.toLowerCase());

    await fetch(url, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'app_id': DICTIONARY_API_APP_ID,
        'app_key': DICTIONARY_API_APP_KEY,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return {};
        }
      })
      .then(data => {
        const results = data.results;
        const lexicalEntries = results && results[0].lexicalEntries;
        const entries = lexicalEntries && lexicalEntries[0].entries;
        const senses = entries && entries[0].senses;
        return senses && senses[0].definitions && senses[0].definitions[0];
      })
      .then((definition) => {
        definition = definition || DEFINITION_NOT_FOUND;
        console.log('definition', definition);
        newTerm = new TermModel({
          word: word,
          definition: definition,
        });
        return newTerm.save();
      })
      .catch((error) => {
        console.log(error);
      });

    book.terms.push(newTerm.id);
    book.lastUpdated = Date.now();
    await book.save();

    console.log(newTerm.toJSON());

    return newTerm.toJSON();
  },
};

export default TermAdd;
