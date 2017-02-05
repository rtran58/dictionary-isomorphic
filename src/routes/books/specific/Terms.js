import React, { PropTypes, Component } from 'react';
import fetch from '../../../core/fetch';
import update from 'react-addons-update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Terms.scss';

import TermList from '../../../components/TermList';
import TermInputForm from '../../../components/TermInputForm';

const API_HEADERS = {
  'Content-Type': 'application/json',
};

class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word: '',
      definition: '',
      terms: [],
    };

    this.addTerm = this.addTerm.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  async componentDidMount() {
    const bookResponse = await fetch('/graphql?query={book(id:\"'+this.props.bookId+'\"){lastUpdated, title}}');
    const bookResponseJSON = await bookResponse.json();
    const book = bookResponseJSON.data.book;

    this.bookTitle = book.title;
    this.bookLastUpdated = book.lastUpdated;

    const termsResponse = await fetch('/graphql?query={terms(bookId:\"'+this.props.bookId+'\"){id, word, definition}}');
    const termsResponseJSON = await termsResponse.json();
    const terms = termsResponseJSON.data.terms;

    this.setState({
      terms,
    });
  }

  addTerm() {
    const bookId = this.props.bookId;
    const word = this.state.word;
    const definition = this.state.definition;

    let prevState = this.state;
    let newTerm = {word, definition, bookId};
    let nextState = update(this.state.terms, {$push: [newTerm]});
    const query = `mutation{createTerm(word: "${word}", 
                                       definition: "${definition}",
                                       bookId: "${bookId}"
                                      ){word, definition}}`;
    fetch('/graphql', {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify({query: query}),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Server response wasn't ok");
      }
    }).then((responseData) => {
      this.setState({
        terms: nextState,
        word: '',
        definition: '',
      });
    }).catch((error) => {
      this.setState({terms: prevState});
    });
  }

  handleWordChange(value) {
    this.setState({word: value});
  }

  handleDefinitionChange(value) {
    this.setState({definition: value});
  }

  render() {
    debugger
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.title}>
            {this.bookTitle}
          </div>
          <TermList terms={this.state.terms} />
          <TermInputForm onSubmitTerm={this.addTerm}
                         onWordChange={this.handleWordChange}
                         onDefinitionChange={this.handleDefinitionChange}
                         word={this.state.word}
                         definition={this.state.definition} />
        </div>
      </div>
    );
  }
}

Terms.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.shape({
    word: PropTypes.string,
    definition: PropTypes.string,
  })),
};

export default withStyles(Terms, s);
