import React from 'react';
import Terms from './Terms';
import fetch from '../../core/fetch';

export const path = '/terms';
export const action = async (state) => {
  const response = await fetch('/graphql?query={terms{word, definition}}');
  const { data } = await response.json();

  state.context.onSetTitle('Ricky\'s Terms');
  return <Terms terms={data.terms} />;
};
