import {
  GraphQLNonNull as NonNull,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import TermType from '../../types/TermsItemType';
import TermModel from '../../models/term';

import BookModel from '../../models/book';

import fetch from '../../../core/fetch';

async function getDefinition(word) {
  const DEFINITION_NOT_FOUND = 'A definition for this word was not found.';

  const DICTIONARY_API_APP_ID = '05ed1f72';
  const DICTIONARY_API_APP_KEY = 'dce698373900e5357bda7aa6d3ee2a0d';
  const DICTIONARY_API_LANG = 'en';
  const url = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/' + DICTIONARY_API_LANG + '/' + encodeURIComponent(word.toLowerCase());

  const definition = await fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'app_id': DICTIONARY_API_APP_ID,
      'app_key': DICTIONARY_API_APP_KEY,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return {};
    }
  }).then((data) => {
    const results = data.results;
    const lexicalEntries = results && results[0].lexicalEntries;
    const entries = lexicalEntries && lexicalEntries[0].entries;
    const senses = entries && entries[0].senses;
    return senses && senses[0].definitions && senses[0].definitions[0];
  }).then((definition) => {
    definition = definition || DEFINITION_NOT_FOUND;
    return definition;
  }).catch((error) => {
    console.log(error);
  });

  return definition;
}

const TermAdd = {
  type: new List(TermType),
  description: 'Add new term',
  args: {
    bookId: {
      name: 'bookId',
      type: new NonNull(StringType),
    },
    words: {
      name: 'words',
      type: new List(StringType),
    },
  },
  async resolve(root, params) {
    const bookId = params.bookId;
    const book = await BookModel.findById(bookId);
    const words = params.words;
    const definitions = [];

    let definition;
    for (var i=0; i<words.length; i++) {
      definition = await getDefinition(words[i]);
      definitions.push({
        word: words[i],
        definition: definition,
      });
    }

    const terms = [];
    let term;
    for (var i=0; i<definitions.length; i++) {
      term = new TermModel({
        word: definitions[i].word,
        definition: definitions[i].definition,
      });
      terms.push(await term.save());
      book.terms.push(term.id);
    }

    book.lastUpdated = Date.now();
    await book.save();

    return terms;
  },
};

export default TermAdd;
