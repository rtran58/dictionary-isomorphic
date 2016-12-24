import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './TermCard.scss';

class TermCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDefinition: false,
    };

    this.toggleDefinition = this.toggleDefinition.bind(this);
  }

  toggleDefinition() {
    debugger
    this.setState({ showDefinition: !this.state.showDefinition });
  }

  render() {
    const word = <span className={s.word}>{this.props.term.word}</span>;
    const definition = <span className={s.definition}>{this.props.term.definition}</span>
    const cardBody = this.state.showDefinition
      ? <div>{word} - {definition}</div>
      : <div>{word}</div>;

    return (
      <div className={cx(s.root, this.props.className)}
           onClick={this.toggleDefinition} >
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
};

export default withStyles(TermCard, s);
