import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TermList.scss';

import TermEntry from '../TermEntry';

const TermList = ({ terms }) => (
  <div>
    {terms.map((term) => (
      <TermEntry key={term.id} term={term} />
    ))}
  </div>
);

TermList.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    definition: PropTypes.string,
  })),
};

export default withStyles(TermList, s);
