import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import requiresLogin from './requires-login';
import './styles/shave-history.css';
import {
  getShaves,
  resetShaveFilter,
} from '../actions/shaves';
import ShaveHistoryItems from './Shave-history-items';
import ShaveNav from './Shave-nav';

export class ShaveHistory extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getShaves());
    dispatch(resetShaveFilter());
  }


  render() {
    const { isLoading, error } = this.props;
    const shaveContent = isLoading
      ? (<p>Loading...</p>)
      : (<ShaveHistoryItems canDelete canEdit showShare />);

    return (
      <section className="shave-history">
        <div className="empty">
          {/* DO NOT DELETE THIS! It helps the column styles work! */}
        </div>

        <header className="shave-header">
          <h2>My Shaves</h2>
          {error}
        </header>

        <section className="shave-nav-container">
          <ShaveNav />
        </section>

        <section className="shave-content">
          <div className="shave-list">
            <div className="shave-list-content">
              {shaveContent}
            </div>
          </div>
        </section>
        
      </section>
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
