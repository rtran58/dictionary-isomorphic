import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TermEntry.scss';

const TermEntry = ({ term }) => (
  <div>
    <b>{term.word}</b> - {term.definition}
  </div>
);

TermEntry.propTypes = {
  term: PropTypes.shape({
    word: PropTypes.string,
    definition: PropTypes.string,
  }),
};

export default withStyles(TermEntry, s);
