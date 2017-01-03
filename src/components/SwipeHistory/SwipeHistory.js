import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SwipeHistory.scss';
import cx from 'classnames';

const SwipeHistory = ({ className, entries }) => (
    <div className={cx(className, s.container)}>
      {entries.map((entry, i) => (
        <div key={i} className={entry.correct ? s.correct : s.wrong}>
          {entry.word} - {entry.correct ? "Correct" : "Wrong"}
        </div>
        )
      )}
    </div>
);

SwipeHistory.propTypes = {
  className: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(SwipeHistory, s);

