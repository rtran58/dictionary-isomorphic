import React, { PropTypes, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SwipeHistory.scss';
import cx from 'classnames';

class SwipeHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingDefinition: false,
    };

    this.toggleShowDefinition = this.toggleShowDefinition.bind(this);
  }

  toggleShowDefinition() {
    this.setState({
      showingDefinition: !this.state.showingDefinition,
    });
  }

  render() {
    const showingDefinition = this.state.showingDefinition;

    return(
      <div className={cx(this.props.className, s.container)}>
        <a href="#" onClick={this.toggleShowDefinition}>{showingDefinition ? "Hide Definitions" : "Show Definitions"}</a>
        {this.props.entries.map((entry, i) => (
            <div key={i} className={entry.correct ? s.correct : s.wrong}>
              <b>{entry.word}</b>{showingDefinition ? " - " + entry.definition : ""}
            </div>
          )
        )}
      </div>
    )
  }
}

SwipeHistory.propTypes = {
  className: PropTypes.string,
  history: PropTypes.arrayOf(PropTypes.object),
};

export default withStyles(SwipeHistory, s);

