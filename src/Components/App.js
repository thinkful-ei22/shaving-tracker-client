import React, { Component } from 'react';
import './styles/App.css';
import LandingPage from './Landing-page';
import ShaveHistory from './Shave-history';
import NavBar from './Navbar';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          < NavBar />
          < Route exact path="/" component={LandingPage} />
          < Route exact path="/shaves" component={ShaveHistory} />
        </div>
      </Router>
    );
  }
}

export default App;
