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
      isLoading,
      error,
    } = this.props;
    const shaveContent = isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems canDelete={false} showUsername />);

    return (
      <section className="shave-history">
        <div className="empty">
          {/* DO NOT DELETE THIS! It helps the column styles work! */}
        </div>

        <header className="shave-header">
          <h2>Community Shaves</h2>
          {error}
        </header>

        <section className="shave-nav-container">
          <CommunityShaveNav />
        </section>

        <section className="shave-list">
          <div className="shave-list-content">
            {shaveContent}
          </div>
        </section>
        
      </section>
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
