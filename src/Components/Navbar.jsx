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
        <h5><Link className="collection-nav" to="/mycollection">My Collection</Link></h5>
        <Link className="nav--shaves" to="/shaves">Shaves</Link>
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
