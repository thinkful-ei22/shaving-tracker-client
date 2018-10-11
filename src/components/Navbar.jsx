import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles/navbar.css';
import LinkButton from './LinkButton';
import { login, clearAuth, loadAuthToken } from '../actions/auth';

export class NavBar extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadAuthToken());
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const { dispatch } = this.props;
    dispatch(login(data));
  }

  logOut() {
    const { dispatch } = this.props;
    dispatch(clearAuth());
  }

  navIcon() {
    const x = document.getElementById('topnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  render() {
    const { error, isLogged } = this.props;
    let errorMsg;
    let loggedIn;
    let loggedOut;
    if (error) {
      errorMsg = (
        <div className="login-error" aria-live="polite">
          {error.message}
        </div>
      );
    }
    if (isLogged) {
      loggedIn = (
        <div className="topnav-links">
          <a
            type="button"
            aria-label="menu"
            className="icon"
            onClick={() => this.navIcon()}
          >
            <i className="fa fa-bars" />
          </a>
          <Link className="collection-nav" to="/mycollection">My Collection</Link>
          <Link className="nav--shaves" to="/shaves">Shaves</Link>
          <Link className="nav--community" to="/community/shaves">Community</Link>
          <LinkButton to="/" className="logout-btn" type="button" onClick={this.logOut}>
            Log Out
          </LinkButton>
        </div>
      );
    } else {
      loggedOut = (
        <div className="topnav-links">
          <div className="form-login-container">
            <form className="form-login" onSubmit={e => this.onSubmit(e)}>
              {errorMsg}
              <label htmlFor="user">
                <span>Username:</span>
                <input type="text" id="user" name="username" required />
              </label>
              <label htmlFor="password">
                Password:
                <input type="password" id="password" name="password" required />
              </label>
              <div>
                <button type="submit" className="login-button">Login</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="topnav" id="topnav">
        <Link className="home-nav" id="home-nav" to="/">
          <h1>
            Beardy Wicked
          </h1>
        </Link>
        <div className="topnav-navbar">
          {loggedIn}
          {loggedOut}
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  // loading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string,
  }),
  isLogged: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  // loading: false,
  error: {},
  isLogged: false,
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isLogged: state.auth.loggedIn,
});

export default connect(mapStateToProps)(NavBar);
