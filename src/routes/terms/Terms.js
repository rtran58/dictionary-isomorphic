import React, { PropTypes, Component } from 'react';
import fetch from '../../core/fetch';
import update from 'react-addons-update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Terms.scss';

import TermCard from '../../components/TermCard';
import TermInputForm from '../../components/TermInputForm';

const API_HEADERS = {
  'Content-Type': 'application/json',
};

class Terms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [],
    };

    this.addTerm = this.addTerm.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/graphql?query={terms{word, definition}}');
    const { data } = await response.json();

    this.setState({
      terms: data.terms,
    });
  }

  addTerm(word, definition) {
    let prevState = this.state;
    let newTerm = {word, definition};
    let nextState = update(this.state.terms, {$push: [newTerm]});
    const query = {"query": "mutation{createTerm(word: \"" + word + "\", definition: \""+definition+"\"){word, definition}}"};


    fetch('/graphql', {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(query),
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Server response wasn't ok");
      }
    }).then((responseData) => {
      this.setState({terms: nextState});
    }).catch((error) => {
      this.setState({terms: prevState});
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {this.state.terms.map((term, i) => (<TermCard className={s.termCard} key={i} term={term}/>))}
          <TermInputForm onSubmitTerm={this.addTerm}/>
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
