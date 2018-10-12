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
    const { error, loggedIn } = this.props;
    let errorMsg;

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
    
    return (
      <div className = "landing-page-body">
        <p className ="welcome-header">Welcome!</p>
        <p className ="welcome-header">Join our shaving community and</p>
        <p className ="welcome-header">keep track of all your products and shaves.</p>
        <div className="sign-up-container">
          <form onSubmit={e => this.onSubmit(e)} className="sign-up-form-container col-6">
            {errorMsg}
            <h3 className="sign-up-header">Join Us</h3>
            <label htmlFor="email">
              Email:
              <input className="col-12" type="text" id="email" name="email" required />
            </label><br/>
            <label htmlFor="register-user">
              Username:
              <input className="col-12" type="text" id="register-user" name="registerusername" required />
            </label><br/>
            <label htmlFor="register-password">
              Password:
              <input className="col-12" type="password" id="register-password" name="registerpassword" required />
            </label><br/>
            <input type="submit" value="Register" className="register-button col-12" />
          </form>
        </div>
        <footer className="landing-page-footer">
          <p>&copy; Hetokibo 2018</p>
        </footer>
      </div>
    );
  }
}

LandingPage.propTypes = {
  // loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  // loading: false,
  loggedIn: false,
  error: '',
};

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(LandingPage);
