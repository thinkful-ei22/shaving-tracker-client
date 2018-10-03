import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteShaves } from '../actions/shaves';

class ShaveHistoryItems extends React.Component {
  onClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteShaves(id));
  }

  render() {
    const { shaveHistory, startFilter, endFilter } = this.props;
    if (!shaveHistory) {
      return <div>No history!</div>;
    }

    const items = [];
    for (let i = 0; i < shaveHistory.length; i += 1) {

      const startFilterComp = startFilter ? new Date(startFilter) : null;
      const itemDateComp = new Date(shaveHistory[i].date);
      const endFilterComp = endFilter ? new Date(endFilter) : null;

      if (startFilterComp && itemDateComp.getTime() < startFilterComp.getTime()) {
        // console.log('itemDate is before startFilter');
        // console.log('comp:', itemDateComp.getTime());
        // console.log('filt:', startFilterComp.getTime());
        continue;
      }

      if (endFilterComp && endFilterComp.getTime() < itemDateComp.getTime()) {
        // console.log('itemDate is after endFilter');
        // console.log('comp:', itemDateComp);
        // console.log('filt:', endFilterComp);
        continue;
      }

      const itemDate = moment(shaveHistory[i].date)
        .tz('Atlantic/Azores')
        .format('MMM Do, YYYY');

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
  startFilter: state.shaves.startFilter,
  endFilter: state.shaves.endFilter,
  // everything: state,
});

export default connect(mapStateToProps)(ShaveHistoryItems);
