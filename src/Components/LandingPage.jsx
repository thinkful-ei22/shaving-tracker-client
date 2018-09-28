import React from 'react';
import PropTypes from 'prop-types';
import './styles/landing-page.css';
import { connect } from 'react-redux';
import { registerUser } from '../actions/register';

class LandingPage extends React.Component {
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
    const { error, isLogged } = this.props;
    let errorMsg;
    let registrationSuccessDisplay;
    if (error) {
      errorMsg = (
        <div className="login-error" aria-live="polite">
          {error}
        </div>
      );
    }
    if (isLogged) {
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
  error: PropTypes.string,
  isLogged: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  // loading: false,
  error: '',
  isLogged: false,
};

const mapStateToProps = state => ({
  isLogged: state.user.isLogged,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(LandingPage);
