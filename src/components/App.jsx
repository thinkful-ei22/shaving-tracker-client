import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.css';
import LandingPage from './Landing-page';
import MyCollection from './My-Collection';
import ShaveHistory from './Shave-history';
import CommunityShaveHistory from './Community-shave-history';
import ProductForm from './Product-form';
import ShaveForm from './Shave-form';
import NavBar from './Navbar';
import store from '../store';
import CSVProducts from './Csv-products';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <main className="app-content">
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/mycollection" component={MyCollection} />
          <Route exact path="/product-form" component={ProductForm} />
          <Route exact path="/shave-form" component={ShaveForm} />
          <Route exact path="/shaves" component={ShaveHistory} />
          <Route exact path="/community/shaves" component={CommunityShaveHistory} />
          <Route exact path="/csvproducts" component={CSVProducts} />
        </main>
      </div>
    </Router>
  </Provider>
);

export default App;
