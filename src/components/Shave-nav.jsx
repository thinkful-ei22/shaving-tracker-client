import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import ShaveForm from './Shave-form';

import {
  setShaveFilterStart,
  setShaveFilterEnd,
} from '../actions/shaves';

export class ShaveNav extends React.Component{

  render(){
    const {
      dispatch
    } = this.props;

    return(
      <section className="shave-nav">
        <div className="shave-date-filter-container">
          <div className="shave-date-filter shave-date-filter-start">
            <label>Start Date: </label>
            <input
              type="date"
              onChange={(e) => {
                dispatch(setShaveFilterStart(e.target.value));
              }}
            />
          </div>
          <div className="shave-date-filter shave-date-filter-end">
            <label>End Date: </label>
            <input
              type="date"
              onChange={(e) => {
                dispatch(setShaveFilterEnd(e.target.value));
              }}
            />
          </div>
        </div>
        <ShaveForm/>
      </section>
    );
  }
}


ShaveNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

ShaveNav.defaultProps = {
  isLoading: false,
  error: null,
};

const mapStateToProps = state => ({
  isLoading: state.shaves.isLoading,
  error: state.shaves.error,
});


export default connect(mapStateToProps)(ShaveNav);
