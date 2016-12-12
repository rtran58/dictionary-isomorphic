import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TermInputForm.scss';

class TermInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      definition: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  handleSubmit(event) {
    console.log('Term was added');
    event.preventDefault();

    this.props.onSubmitTerm(this.state['word'], this.state['definition']);
  }

  handleWordChange(event) {
    event.preventDefault();
    this.setState({word: event.target.value});
  }

  handleDefinitionChange(event) {
    event.preventDefault();
    this.setState({definition: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Word:
          <input type="text" value={this.state.word} onChange={this.handleWordChange} />
        </label>
        <label>
          Definition:
          <input type="textarea" value={this.state.definition} onChange={this.handleDefinitionChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default withStyles(TermInputForm, s);
