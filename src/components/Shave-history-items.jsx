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
    const { canDelete, showUsername, shaveHistory, startFilter, endFilter } = this.props;
    if (!shaveHistory || !shaveHistory.length > 0) {
      return <div>No history!</div>;
    }

    const items = [];
    const sortedShaveHist = shaveHistory.sort((item1, item2) => {
      return new Date(item1.date).getTime() - new Date(item2.date).getTime();
    });

    for (let i = 0; i < sortedShaveHist.length; i += 1) {

      const startFilterComp = startFilter ? new Date(startFilter) : null;
      const itemDateComp = new Date(sortedShaveHist[i].date);
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

      const itemDate = moment(sortedShaveHist[i].date)
        .tz('Atlantic/Azores')
        .format('MMM Do, YYYY');

      const keys = Object.keys(sortedShaveHist[i]);
      const nicknames = {};
      keys.forEach((key) => {
        nicknames[key] = sortedShaveHist[i][key]
          ? sortedShaveHist[i][key].nickname
          : 'None';
      });

      const deleteButton = canDelete
        ? <button type="button" className="delete-shave-history" onClick={() => this.onClick(sortedShaveHist[i].id)}>Delete</button>
        : '';

      const username = showUsername
        ? [
          <span className="shave-list-item-products--label" key="usernameLabel">User: </span>,
          <span key="usernameVal">{sortedShaveHist[i].username}</span>,
        ]
        : '';

      items.push(
        <div className="shave-list-item" key={sortedShaveHist[i].id}>
          <h3>{itemDate}</h3>
          <div className="shave-list-item-products">
            {username}
            <span className="shave-list-item-products--label">Rating: </span>
            <span>{sortedShaveHist[i].rating ? sortedShaveHist[i].rating : 'None '}</span>

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
          {deleteButton}
        </div>,
      );
    }

    return (
      items
    );
  }
}

ShaveHistoryItems.propTypes = {
  canDelete: PropTypes.bool,
  showUsername: PropTypes.bool,
  shaveHistory: PropTypes.arrayOf(Object),
  dispatch: PropTypes.func.isRequired,
};

ShaveHistoryItems.defaultProps = {
  canDelete: false,
  showUsername: false,
  shaveHistory: [],
};

const mapStateToProps = state => ({
  shaveHistory: state.shaves.shaveHistory,
  startFilter: state.shaves.startFilter,
  endFilter: state.shaves.endFilter,
  // everything: state,
});

export default connect(mapStateToProps)(ShaveHistoryItems);
