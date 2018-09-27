import React, { Component } from 'react';
import './styles/App.css';
import LandingPage from './Landing-page';
import NavBar from './Navbar';
import ProductForm from './Product-form';
import ShaveForm from './Shave-form';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          < NavBar />
          < Route exact path="/" component={LandingPage} />
          < Route exact path="/product-form" component={ProductForm} />
          < Route exact path="/shave-form" component={ShaveForm} />
        </div>
      </Router>
    );
  }
}

export default App;
