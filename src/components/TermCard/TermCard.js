import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './TermCard.scss';

const TermCard = ({ className, term }) => (
  <div className={cx(s.root, className)}>
    <div className={s.container}>
      <div className={s.word}>{term.word}</div>
      <div className={s.definition}>{term.definition}</div>
    </div>
  </div>
);

TermCard.propTypes = {
  className: PropTypes.string,
  term: PropTypes.shape({
    word: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
  }),
};

export default withStyles(TermCard, s);
