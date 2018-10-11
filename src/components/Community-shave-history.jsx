import React from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import requiresLogin from './requires-login';
import './styles/shave-history.css';
import {
  setShaveFiltersGetCommunityShaves,
} from '../actions/shaves';
import ShaveHistoryItems from './Shave-history-items';

export class CommunityShaveHistory extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    const oneMonthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    dispatch(setShaveFiltersGetCommunityShaves(oneMonthAgo, today));
  }

  render() {
    const {
      dispatch,
      isLoading,
      error,
      startFilter,
      endFilter,
    } = this.props;
    const shaveContent = isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems canDelete={false} showUsername />);

    return (
      <div className="shave-history">
        <h2>Shaves</h2>
        {error}
        <div className="shave-date-filter-container">
          <h3>Date Filter: </h3>
          <label>Start Date: </label>
          <input
            type="date"
            value={startFilter}
            onChange={(e) => {
              const newStart = e.target.value || moment().subtract(1, 'months').format('YYYY-MM-DD')
              dispatch(setShaveFiltersGetCommunityShaves(newStart, endFilter));
            }}
          />

          <br />
          <label>End Date: </label>
          <input
            type="date"
            value={endFilter}
            onChange={(e) => {
              const newEnd = e.target.value || moment().format('YYYY-MM-DD');
              dispatch(setShaveFiltersGetCommunityShaves(startFilter, newEnd));
            }}
          />
        </div>
        <div className="shave-list">
          <div className="shave-list-content">
            {shaveContent}
          </div>
        </div>
      </div>
    );
  }
}

CommunityShaveHistory.propTypes = {
  startFilter: PropTypes.string,
  endFilter: PropTypes.string, // filters are YYYY-MM-DD dates stored as strings
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

CommunityShaveHistory.defaultProps = {
  startFilter: '',
  endFilter: '',
  isLoading: false,
  error: null,
};

const mapStateToProps = state => ({
  startFilter: state.shaves.startFilter,
  endFilter: state.shaves.endFilter,
  isLoading: state.shaves.isLoading,
  error: state.shaves.error,
});


export default requiresLogin()(connect(mapStateToProps)(CommunityShaveHistory));
