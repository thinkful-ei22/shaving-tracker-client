import React from 'react';
import './styles/navbar.css';
import {Link} from 'react-router-dom';
import {login} from '../Actions/auth';
import {connect} from 'react-redux';

class NavBar extends React.Component {
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
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
            Incorrect username or password
        </div>
    );
    }

    return (
      <div>
        <h1><Link className='home-nav' to="/">Home</Link></h1>
        <form className="form-login" onSubmit={e => this.onSubmit(e)}>
          <label htmlFor='user'>Username:</label>
        <input type='text' id='user' name='username' required></input>
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required></input>
        <input type='submit' value ='Login' className="login-button"></input>
        </form>
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