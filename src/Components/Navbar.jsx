import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';

class NavBar extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
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
    clearAuthToken();
  }

  render() {
    const { error, isLogged } = this.props;
    let errorMsg;
    let loggedInStatusDisplay;
    if (error) {
      errorMsg = (
        <div className="login-error" aria-live="polite">
            Incorrect username or password
        </div>
      );
    }
    if (isLogged) {
      loggedInStatusDisplay = (
        <div className="test">Logged in</div>
      );
    }
    return (
      <div>
        <h1><Link className="home-nav" to="/">Home</Link></h1>
        {loggedInStatusDisplay}
        <form className="form-login" onSubmit={e => this.onSubmit(e)}>
          {errorMsg}
          <label htmlFor="user">
            Username:
            <input type="text" id="user" name="username" required />
          </label>
          <label htmlFor="password">
            Password:
            <input type="password" id="password" name="password" required />
          </label>
          <input type="submit" value="Login" className="login-button" />
        </form>
        <div><button type="button" onClick={this.logOut}>LOG OUT</button></div>
      </div>
    );
  }
}

NavBar.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  isLogged: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  loading: false,
  error: {},
  isLogged: false,
};

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  isLogged: state.authReducer.loggedIn,
});

export default connect(mapStateToProps)(NavBar);
