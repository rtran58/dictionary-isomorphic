import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookCard.scss';
import cx from 'classnames';

import { Media } from 'react-bootstrap';

const BookCard = ({ className, book }) => (
  <a href={"/books/"+book._id}>
    <Media>
      <Media.Left>
        <i width={64} height={64} class="fa fa-folder" />
      </Media.Left>
      <Media.Body>
        <Media.Heading>{book.title}</Media.Heading>
        <p>Placeholder description</p>
      </Media.Body>
    </Media>
  </a>


  // <div className={cx(s.container, className)}>
  //   <a href={"books/"+book._id}>
  //     {book.title}
  //   </a>
  // </div>
);

BookCard.propTypes = {
  className: PropTypes.string
};

export default withStyles(BookCard, s);
