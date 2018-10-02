import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteShaves } from '../actions/shaves';

class ShaveHistoryItems extends React.Component {
  onClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteShaves(id));
  }

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
        <div className="shave-list-item" key={shaveHistory[i].id}>
          <h3>{itemDate}</h3>
          <div className="shave-list-item-products">
            <span className="shave-list-item-products--label">Rating: </span>
            <span>{shaveHistory[i].rating ? shaveHistory[i].rating : 'None '}</span>

            <span className="shave-list-item-products--label">Razor: </span>
            <span>{nicknames.razor}</span>

            <span className="shave-list-item-products--label">Blade: </span>
            <span>{nicknames.blade}</span>

            <span className="shave-list-item-products--label">Brush: </span>
            <span>{nicknames.brush}</span>

            <span className="shave-list-item-products--label">Lather: </span>
            <span>{nicknames.lather}</span>

            <span className="shave-list-item-products--label">Aftershave: </span>
            <span>{nicknames.aftershave}</span>

            <span className="shave-list-item-products--label">Additional Care: </span>
            <span>{nicknames.additionalCare}</span>

          </div>
          <button type="button" className="delete-shave-history" onClick={() => this.onClick(shaveHistory[i].id)}>Delete</button>
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
  dispatch: PropTypes.func.isRequired,
};

ShaveHistoryItems.defaultProps = {
  shaveHistory: [],
};

const mapStateToProps = state => ({
  shaveHistory: state.shaves.shaveHistory,
  everything: state,
});

export default connect(mapStateToProps)(ShaveHistoryItems);
