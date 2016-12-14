import React from 'react';
import Terms from './Terms';

export const path = '/books/:id';
export const action = (state, component) => {
  const title = 'Book' + state.params.id;
  state.context.onSetTitle(title);
  return <Terms />
};
