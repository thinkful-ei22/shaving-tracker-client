import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MyCollection from './My-Collection';
import NavBar from './NavBar';
import ProductForm from './Product-form';
import ShaveForm from './Shave-form';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/mycollection" component={MyCollection} />
      <Route exact path="/product-form" component={ProductForm} />
      <Route exact path="/shave-form" component={ShaveForm} />
    </div>
  </Router>
);


export default App;
