import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MyCollection from './My-Collection';
import ShaveHistory from './Shave-history';
import NavBar from './Navbar';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/mycollection" component={MyCollection} />
      <Route exact path="/shaves" component={ShaveHistory} />
    </div>
  </Router>
);


export default App;
