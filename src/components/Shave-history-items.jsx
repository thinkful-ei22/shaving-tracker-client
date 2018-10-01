import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class ShaveHistoryItems extends React.Component {
  render() {
    const { shaveHistory } = this.props;
    if (!shaveHistory) {
      return <div>No history!</div>;
    }

    const items = [];
    for (let i = 0; i < shaveHistory.length; i += 1) {
      const itemDate = new Date(shaveHistory[i].date)
        .toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric',
        });
      const keys = Object.keys(shaveHistory[i]);
      const nicknames = {};
      keys.forEach((key) => {
        nicknames[key] = shaveHistory[i][key]
          ? shaveHistory[i][key].nickname
          : 'None';
      });
      items.push(
        <div className="shave-list-item" key={`shave-list-item-${i}`}>
          <h3>{itemDate}</h3>
          <p>{`Rating: ${shaveHistory[i].rating ? shaveHistory[i].rating : 'None'}`}</p>
          <p>{`Razor: ${nicknames.razor}`}</p>
          <p>{`Blade: ${nicknames.blade}`}</p>
          <p>{`Brush: ${nicknames.brush}`}</p>
          <p>{`Lather: ${nicknames.lather}`}</p>
          <p>{`Aftershave: ${nicknames.aftershave}`}</p>
          <p>{`Additional Care: ${nicknames.additionalCare}`}</p>
        </div>,
      );
    }

    return (
      items
    );
  }
}

ShaveHistoryItems.propTypes = {
  shaveHistory: PropTypes.arrayOf(Object),
};

ShaveHistoryItems.defaultProps = {
  shaveHistory: [],
};

const mapStateToProps = state => ({
  shaveHistory: state.shaves.shaveHistory,
  everything: state,
});

export default connect(mapStateToProps)(ShaveHistoryItems);
