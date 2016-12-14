import React, { PropTypes, Component } from 'react';
import fetch from '../../../core/fetch';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Books.scss';

import BookCard from '../../../components/BookCard';

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    }
  }

  async componentDidMount() {
    const response = await fetch('/graphql?query={books{title}}');
    const { data } = await response.json();

    this.setState({
      books: data.books
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.books.map((book) => <BookCard book={book} /> )}
        </div>
      </div>
    )
  }
}

export default withStyles(Books, s);
