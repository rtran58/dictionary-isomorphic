/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import queryMe from './queries/me';
import queryContent from './queries/content';
import queryNews from './queries/news';
import queryTerms from './queries/terms';
import queryBooks from './queries/books';

import mutationTermAdd from './mutations/term/add';
import mutationCreateBook from './mutations/book/add'

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me: queryMe,
      content: queryContent,
      news: queryNews,
      terms: queryTerms,
      books: queryBooks,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      createTerm: mutationTermAdd,
      createBook: mutationCreateBook,
    },
  }),
});

export default schema;
