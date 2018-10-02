import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import './styles/shave-history.css';
import {
  getShaves,
  setShaveFilterStart,
  setShaveFilterEnd,
} from '../actions/shaves';
import ShaveHistoryItems from './Shave-history-items';

class ShaveHistory extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getShaves());
  }


  render() {
    const { dispatch, isLoading, error } = this.props;
    const shaveContent = isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems />);

    return (
      <div className="shave-history">
        <h2>Shaves</h2>
        {error}
        <Link className="shave-form-link" to="/shave-form">
          <button type="button">+ Shave</button>
        </Link>
        <div className="shave-date-filter-container">
          <h3>Date Filter: </h3>
          <label>Start Date: </label>
          <input
            type="date"
            onChange={(e) => {
              dispatch(setShaveFilterStart(e.target.value));
            }}
          />

          <br />
          <label>End Date: </label>
          <input type="date" />
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

ShaveHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

ShaveHistory.defaultProps = {
  isLoading: false,
  error: null,
};

const mapStateToProps = state => ({
  isLoading: state.shaves.isLoading,
  error: state.shaves.error,
});


export default requiresLogin()(connect(mapStateToProps)(ShaveHistory));
