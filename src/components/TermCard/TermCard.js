import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './TermCard.scss';

class TermCard extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.onToggle();
  }

  render() {
    const word = <span className={s.word}>{this.props.term.word}</span>;
    const definition = <span className={s.definition}>{this.props.term.definition}</span>
    const cardBody = this.props.showingDefinition
      ? <div>{word} - {definition}</div>
      : <div>{word}</div>;

    return (
      <div className={cx(s.root, this.props.className)}
           onClick={this.handleToggle} >
        <div className={s.container} >
          {cardBody}
        </div>
      </div>
    );
  }
}

TermCard.propTypes = {
  className: PropTypes.string,
  term: PropTypes.shape({
    word: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
  }),
  onToggle: PropTypes.func,
};

export default withStyles(TermCard, s);
