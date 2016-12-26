import React from 'react';
import SwipeGame from './Swipe';

export const path = '/games/swipe/:bookid';
export const action = (state, component) => {
  const title = 'Swipe Game';
  state.context.onSetTitle(title);
  return <SwipeGame bookId={state.params.bookid} />
};
