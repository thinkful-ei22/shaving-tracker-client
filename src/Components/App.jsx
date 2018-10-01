import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Landing-page';
import MyCollection from './My-Collection';
import ShaveHistory from './Shave-history';
import NavBar from './Navbar';
import ProductForm from './Product-form';
import ShaveForm from './Shave-form';

const App = () => (
  <Router>
    <div className="app-container">
      <NavBar />
      <div className="content-container">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/mycollection" component={MyCollection} />
        <Route exact path="/product-form" component={ProductForm} />
        <Route exact path="/shave-form" component={ShaveForm} />
        <Route exact path="/shaves" component={ShaveHistory} />
      </div>
    </div>
  </Router>
);


export default App;
