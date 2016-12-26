import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Swipe.scss';
import _ from 'underscore';

function mapById(arr, idPropertyName) {
  const dictionary = {};
  for (let i=0; i<arr.length; i++) {
    dictionary[arr[i][idPropertyName]] = arr[i];
  }
  return dictionary;
}

function merge(termsMap, scoresMap) {
  const dictionary = {};
  _.each(scoresMap, function(val, key) {
    dictionary[key] = {};
    dictionary[key].termId = termsMap[key]._id;
    dictionary[key].word = termsMap[key].word;
    dictionary[key].definition = termsMap[key].definition;
    dictionary[key].score = scoresMap[key].score;
    dictionary[key].frequency = scoresMap[key].frequency;
  });
  return dictionary;
}

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [],
      currTermIndex: 0,
    }
  }

  async componentDidMount() {
    const termsResponse = await fetch('/graphql?query={terms(bookId:\"'+this.props.bookId+'\"){_id, word, definition}}');
    const termsResponseJSON = await termsResponse.json();
    const terms = termsResponseJSON.data.terms;

    const swipeResponse = await fetch('/graphql?query={swipeScore(bookId:\"'+this.props.bookId+'\"){_id, bookId, lastUpdated, scores{termId,score,frequency}}}');
    const swipeResponseJSON = await swipeResponse.json();
    const swipe = swipeResponseJSON.data.swipeScore;
    const scores = swipe.scores;

    const termsMap= mapById(terms, '_id');
    const scoresMap = mapById(scores, 'termId');
    const dictionary = merge(termsMap, scoresMap);

    // this.setState({
    //   terms:
    // })
  }

  render() {
    return(
      <div>{this.props.bookId}</div>
    );
  }
}

export default Swipe;
