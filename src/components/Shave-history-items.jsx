import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import EditShaves from './Edit-shave';
import { deleteShaves } from '../actions/shaves';

class ShaveHistoryItems extends React.Component {
  onClick(id) {
    const { dispatch } = this.props;
    dispatch(deleteShaves(id));
  }

  render() {
    const {
      canDelete,
      canEdit,
      showUsername,
      showShare,
      shaveHistory,
      startFilter,
      endFilter,
    } = this.props;
    const noHistory = <div>No History!</div>

    if (!shaveHistory || !shaveHistory.length > 0) {
      return (noHistory);
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
        continue;
      }
      if (endFilterComp && endFilterComp.getTime() < itemDateComp.getTime()) {
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

      const editButton = canEdit
        ? <EditShaves shaveItem={sortedShaveHist[i]} shaveId={sortedShaveHist[i].id} nickName={nicknames} />
        : '';
      const username = showUsername
        ? [
          <span className="shave-list-item-products--label" key="usernameLabel">User: </span>,
          <span key="usernameVal">{sortedShaveHist[i].username}</span>,
        ]
        : '';

      const share = showShare
        ? [
          <span className="shave-list-item-products--label" key="shareLabel">Shared: </span>,
          <span key="shareVal">{sortedShaveHist[i].share ? 'Yes' : 'No'}</span>,
        ]
        : '';

      console.log(sortedShaveHist[i].imageUrl);
      const imgUrl = sortedShaveHist[i].imageUrl
        ? sortedShaveHist[i].imageUrl
        : 'https://i.imgur.com/QvDFh9r.png'

      items.push(
        <div className="shave-list-item" key={sortedShaveHist[i].id}>
          <h3>{itemDate}</h3>

          <div className="image-div-normalizer">
            <img src={imgUrl} alt="" />
          </div>

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

            {share}

            <span className="shave-list-item-products--label">Comments: </span>
            <span>{sortedShaveHist[i].comments}</span>

          </div>
          <div>
            {deleteButton}
          </div>
          <div>
            {editButton}
          </div>
        </div>,
      );
    }

    if(items.length > 0){
      return (items);
    }else{
      return (noHistory);
    }
  }
}

ShaveHistoryItems.propTypes = {
  startFilter: PropTypes.string,
  endFilter: PropTypes.string, // filters are YYYY-MM-DD dates stored as strings
  canDelete: PropTypes.bool,
  canEdit: PropTypes.bool,
  showUsername: PropTypes.bool,
  showShare: PropTypes.bool,
  shaveHistory: PropTypes.arrayOf(Object),
  dispatch: PropTypes.func.isRequired,
};

ShaveHistoryItems.defaultProps = {
  startFilter: null,
  endFilter: null,
  canDelete: false,
  canEdit: false,
  showUsername: false,
  showShare: false,
  shaveHistory: [],
};

const mapStateToProps = state => ({
  shaveHistory: state.shaves.shaveHistory,
  startFilter: state.shaves.startFilter,
  endFilter: state.shaves.endFilter,
  // everything: state,
});

export default connect(mapStateToProps)(ShaveHistoryItems);
