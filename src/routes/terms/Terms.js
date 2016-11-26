import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Terms.scss';

import TermCard from '../../components/TermCard';

function Terms({ terms }) {
  return (
    <div className={s.root}>
      <div className={s.container}>
        {terms.map((term) => (<TermCard className={s.termCard} key={term.word} term={term} />))}
      </div>
    </div>
  );
}

Terms.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    definition: PropTypes.string,
  })),
};

export default withStyles(Terms, s);
