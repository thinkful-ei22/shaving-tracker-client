import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment-timezone';

import {
  setShaveFiltersGetCommunityShaves,
} from '../actions/shaves';

class CommunityShaveNav extends React.Component{
  

  render(){
    const {
      dispatch,
      startFilter,
      endFilter,
    } = this.props;

    return(
      <section className="shave-nav">
        <div className="shave-date-filter-container">
          <div className="shave-date-filter shave-date-filter-start">
            <label>Start Date: </label>
            <input
              type="date"
              value={startFilter}
              onChange={(e) => {
                const newStart = e.target.value || moment().subtract(1, 'months').format('YYYY-MM-DD')
                dispatch(setShaveFiltersGetCommunityShaves(newStart, endFilter));
              }}
            />
          </div>
          <div className="shave-date-filter shave-date-filter-end">
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
        </div>
      </section>
    );
  }
}

CommunityShaveNav.propTypes = {
  startFilter: PropTypes.string,
  endFilter: PropTypes.string, // filters are YYYY-MM-DD dates stored as strings
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

CommunityShaveNav.defaultProps = {
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


export default connect(mapStateToProps)(CommunityShaveNav);