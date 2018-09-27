import React from 'react';
import './styles/navbar.css';
import {Link, Redirect} from 'react-router-dom';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import { clearAuthToken } from '../local-storage';

class NavBar extends React.Component {
  logOut = () => {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    // console.log(data);
    this.props.dispatch(login(data));
  }
  render() {
    let error;
    let msg;
    if (this.props.error) {
      error = (
        <div className="login-error" aria-live="polite">
            Incorrect username or password
        </div>
    );
    }
    if (this.props.isLogged) {
      msg = (
        <div className='test'>Logged in</div>
      )
    }
    return (
      <div className='nav'>
        <h1><Link className='nav--home' to="/">Home</Link></h1>
        <Link className='nav--shaves' to="/shaves">Shaves</Link>
        {msg}
        <form className="form-login" onSubmit={e => this.onSubmit(e)}>
          {error}
          <label htmlFor='user'>Username:</label>
          <input type='text' id='user' name='username' required></input>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' name='password' required></input>
          <input type='submit' value ='Login' className="login-button"></input>
          </form>
          <div><button onClick={this.logOut}>LOG OUT</button></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.authReducer.loading,
  error: state.authReducer.error,
  isLogged: state.authReducer.loggedIn 
})

export default connect(mapStateToProps)(NavBar);