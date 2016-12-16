import React, { PropTypes, Component } from 'react';
import fetch from '../../../core/fetch';
import update from 'react-addons-update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Terms.scss';

import TermCard from '../../../components/TermCard';
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
    const response = await fetch('/graphql?query={terms(bookId:\"'+this.props.bookId+'\"){_id, word, definition}}');
    const { data } = await response.json();

    this.setState({
      terms: data.terms,
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
                                      ){word, definition, bookId}}`;
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
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.terms.map((term, i) => (<TermCard className={s.termCard} key={term._id} term={term}/>))}
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
