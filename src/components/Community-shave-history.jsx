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
import CommunityShaveNav from './Community-shave-nav';

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
        <div className="empty">

        </div>

        <div className="shave-header">
          <h2>Community Shaves</h2>
          {error}
        </div>

        <div className="shave-nav-container">
          <CommunityShaveNav />
        </div>

        <div className="shave-content">
          <div className="shave-list">
            <div className="shave-list-content">
              {shaveContent}
            </div>
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
