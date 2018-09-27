import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Landing-page';
import NavBar from './Navbar';
import ProductForm from './Product-form';
import ShaveForm from './Shave-form';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/product-form" component={ProductForm} />
          <Route exact path="/shave-form" component={ShaveForm} />
        </div>
      </Router>
    );
  }
}

export default App;
