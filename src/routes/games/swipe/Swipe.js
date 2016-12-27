import React, { Component, PropTypes } from 'react';
import update from 'react-addons-update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Swipe.scss';
import _ from 'underscore';

import TermCard from '../../../components/TermCard';

function mapById(arr, idPropertyName) {
  const dictionary = {};
  for (let i=0; i<arr.length; i++) {
    dictionary[arr[i][idPropertyName]] = arr[i];
  }
  return dictionary;
}

// merges the terms and scores to form
// a dictionary of terms with the
// word, definition, score, and frequency.
// this is used to keep track of how many
// times a word should be in play
function merge(termsMap, scoresMap) {
  const dictionary = {};
  _.each(scoresMap, function(val, key) {
    dictionary[key] = {};
    dictionary[key].termId = termsMap[key]._id;
    dictionary[key].word = termsMap[key].word;
    dictionary[key].definition = termsMap[key].definition;
    dictionary[key].score = parseInt(scoresMap[key].score);
    dictionary[key].frequency = parseInt(scoresMap[key].frequency);
  });
  return dictionary;
}

function constructDeckOfTerms(terms, dictionary) {
  const arr = [];
  let frequency;
  _.each(terms, (term) => {
    frequency = dictionary[term._id].frequency;
    while (frequency) {
      arr.push(term);
      frequency--;
    }
  });
  return arr;
}

class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [],
      deck: [],
      score: {},
      currTermIndex: 0,
    };

    this.handleWrong = this.handleWrong.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
  }

  // generate random index between 0 and max
  // used to pick a random term from the deck
  roll(max) {
    return Math.floor(Math.random() * max);
  }

  // pick a new term index from deck
  getNextTermIndex(currTerm, nextState) {
    // if only one word left in deck, return the first term
    if (this.state.terms.length === 1) {
      return 0;
    }

    let nextIndex = this.roll(nextState.deck.length);
    while (nextState.deck[nextIndex]._id === currTerm._id) {
      nextIndex = this.roll(nextState.deck.length);
    }
    return nextIndex;
  }

  // game logic for getting a term wrong
  // add an addition term card to the deck
  // and update the frequency of that term
  // on the score card. then select a new term
  // from deck.
  handleWrong(e) {
    e.preventDefault();
    let prevState = this.state;

    const currTerm = this.state.deck[this.state.currTermIndex];
    const updatedFrequency = this.state.score[currTerm._id].frequency + 1;
    let nextState = update(this.state, {
      deck: {
        $push: [currTerm]
      },
      score: {
        [currTerm._id]: {
          frequency: {
            $set: updatedFrequency
          }
        }
      },
    });

    const nextTermIndex = this.getNextTermIndex(currTerm, nextState);
    nextState = update(nextState, {
      currTermIndex: {
        $set: nextTermIndex
      },
    });

    this.setState(nextState);
  }

  // game logic for getting a term right
  // remove term card from deck and decrement
  // frequency of that term on the score card.
  // then select a new term from deck
  handleCorrect(e) {
    e.preventDefault();

    let prevState = this.state;
    const currTerm = this.state.deck[this.state.currTermIndex];
    const updatedFrequency = this.state.score[currTerm._id].frequency - 1;
    let nextState = update(this.state, {
      deck: {
        $splice: [[this.state.currTermIndex, 1]]
      },
      score: {
        [currTerm._id]: {
          frequency: {
            $set: updatedFrequency
          },
        },
      },
    });

    if (updatedFrequency === 0) {
      const termIndex = this.state.terms.findIndex((term) => {
        return term._id === currTerm._id;
      });

      nextState = update(nextState, {
        terms: {
          $splice: [[termIndex, 1]]
        },
      });
    }

    const nextTermIndex = this.roll(nextState.deck.length);
    nextState = update(nextState, {
      currTermIndex: {
        $set: nextTermIndex
      },
    });

    this.setState(nextState);
  }

  // fetch collection of terms and scores
  // and construct deck based on scores for each term.
  // a specific term may show up numerous times in the deck
  // based on its frequency on the score card.
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
    const deck = constructDeckOfTerms(terms, dictionary);
    const currTermIndex = this.roll(deck.length);
    this.setState({
      terms: terms,
      deck: deck,
      score: dictionary,
      currTermIndex: currTermIndex,
    });
  }

  render() {
    console.log(this.state);
    if (!this.state.terms.length) return <div>No more terms left</div>;
    if (!this.state.deck.length) return <div>loading...</div>;

    return(
      <div>
        <TermCard term={this.state.deck[this.state.currTermIndex]} />
        <a href="#" onClick={this.handleWrong}>Wrong</a>
        <a href="#" onClick={this.handleCorrect}>Correct</a>
      </div>
    );
  }
}

export default Swipe;
