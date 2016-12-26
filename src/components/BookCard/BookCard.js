import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookCard.scss';
import cx from 'classnames';

const BookCard = ({ className, book }) => (
  <div className={cx(s.container, className)}>
    <a href={"games/swipe/"+book._id}>
      {book.title}
    </a>
  </div>
);

BookCard.propTypes = {
  className: PropTypes.string
};

export default withStyles(BookCard, s);
