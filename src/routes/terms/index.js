import React from 'react';
import Terms from './Terms';

export const path = '/terms';
export const action = async (state) => {
  const title = 'Ricky\'s Terms';
  state.context.onSetTitle(title);
  return <Terms />;
};
