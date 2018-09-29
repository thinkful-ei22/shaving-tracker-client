import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import './styles/shave-history.css';
import { getShaves } from '../Actions/shaves';
import ShaveHistoryItems from './Shave-history-items';

class ShaveHistory extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getShaves());
  }

  render() {
    const { isLoading, error } = this.props;
    const shaveContent = isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems />);

    return (
      <div className="shave-history">
        <h2>Shaves</h2>
        {error}
        <div className="shave-list">
          {shaveContent}
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


export default connect(mapStateToProps)(ShaveHistory);
