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
    let loggedIn;
    let loggedOut;
    if (error) {
      errorMsg = (
        <div className="login-error" aria-live="polite">
          Incorrect username or password
        </div>
      );
    }
    if (isLogged) {
      loggedIn = (
        <div>
          <Link className="collection-nav" to="/mycollection">My Collection</Link>
          <Link className="nav--shaves" to="/shaves">Shaves</Link>
          <Link to="/product-form">Product Form</Link>
          <Link to="/shave-form">Shave Form</Link>
          <button type="button" onClick={this.logOut}>LOG OUT</button>
        </div>
      );
    } else {
      loggedOut = (
        <form className="form-login" onSubmit={e => this.onSubmit(e)}>
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
      );
    }
    return (
      <div>
        <h1><Link className="home-nav" to="/">Home</Link></h1>
        {errorMsg}
        {loggedIn}
        {loggedOut}
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
