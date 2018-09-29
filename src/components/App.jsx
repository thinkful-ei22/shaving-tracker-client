import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles/App.css';
import LandingPage from './LandingPage';
import MyCollection from './My-Collection';
import ShaveHistory from './Shave-history';
import NavBar from './Navbar';
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Router>
      <div>
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/mycollection" component={MyCollection} />
        <Route exact path="/shaves" component={ShaveHistory} />
      </div>
    </Router>
  </Provider>
);

export default App;
