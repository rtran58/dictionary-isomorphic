import React from 'react';
import Books from './Books';

export const path = '/books';
export const action = (state) => {
  const title = 'Books';
  state.context.onSetTitle(title);
  return <Books />;
};
