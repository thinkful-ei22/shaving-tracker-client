import React from 'react';
import PropTypes from 'prop-types';
import './styles/landing-page.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/register';

export class LandingPage extends React.Component {
  onSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.registerusername.value,
      password: e.target.registerpassword.value,
      email: e.target.email.value,
    };
    const { dispatch } = this.props;
    dispatch(registerUser(data));
  }

  render() {
    const { error, didRegisterSucceed, loggedIn } = this.props;
    let errorMsg;
    let registrationSuccessDisplay;

    if (loggedIn) {
      return <Redirect to="/mycollection" />;
    }

    if (error) {
      errorMsg = (
        <div className="login-error" aria-live="polite">
          {error}
        </div>
      );
    }
    if (didRegisterSucceed) {
      registrationSuccessDisplay = (
        <div className="test">Register Success</div>
      );
    }
    return (
      <div>
        <h2>Welcome!</h2>
        <div className="sign-up-container">
          <form onSubmit={e => this.onSubmit(e)} className="sign-up-form-container">
            {errorMsg}
            <label htmlFor="email">
              Email:
              <input type="text" id="email" name="email" required />
            </label>
            <label htmlFor="register-user">
              Username:
              <input type="text" id="register-user" name="registerusername" required />
            </label>
            <label htmlFor="register-password">
              Password:
              <input type="password" id="register-password" name="registerpassword" required />
            </label>
            <input type="submit" value="Register" className="register-button" />
            {registrationSuccessDisplay}
          </form>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  // loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  error: PropTypes.string,
  didRegisterSucceed: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  // loading: false,
  loggedIn: false,
  error: '',
  didRegisterSucceed: false,
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  didRegisterSucceed: state.user.isLogged,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(LandingPage);
