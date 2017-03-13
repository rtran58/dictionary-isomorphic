import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TermInputForm.scss';

class TermInputForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmitTerm();
  }


  handleWordChange(event) {
    event.preventDefault();
    this.props.onWordChange(event.target.value);
  }

  handleDefinitionChange(event) {
    event.preventDefault();
    this.props.onDefinitionChange(event.target.value);
  }

  render() {
    return (
      <form className={s.root} onSubmit={this.handleSubmit}>
        <label className={s.label}>
          Word:
          <textarea className={s.textarea}rows="6" cols="50" value={this.props.input} onChange={this.handleWordChange} />
        </label>
        <input className={s.input} type="submit" value="Submit" />
      </form>
    )
  }
}

export default withStyles(TermInputForm, s);
