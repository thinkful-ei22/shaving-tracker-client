import React from 'react';
import './styles/landing-page.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../actions/register';

class LandingPage extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.registerusername.value,
      password: e.target.registerpassword.value,
      email: e.target.email.value,
    };
    console.log(data);
    this.props.dispatch(registerUser(data));
  }

  render() {
    let error;
    let msg;
    if (this.props.error) {
      error = (
        <div className="login-error" aria-live="polite">
            Username already exists
        </div>
      );
    }
    if (this.props.isLogged) {
      msg = (
        <div className="test">Register Success</div>
      );
    }
    return (
      <div>
        <h2>Welcome!</h2>
        <div className="sign-up-container">
          <form onSubmit={e => this.onSubmit(e)} className="sign-up-form-container">
            {error}
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" required />
            <label htmlFor="register-user">Username:</label>
            <input type="text" id="register-user" name="registerusername" required />
            <label htmlFor="register-password">Password:</label>
            <input type="password" id="register-password" name="registerpassword" required />
            <input type="submit" value="Register" className="register-button" />
            {msg}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogged: state.userReducer.isLogged,
  loading: state.userReducer.loading,
  error: state.userReducer.error,
});

export default connect(mapStateToProps)(LandingPage);
