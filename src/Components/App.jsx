import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from './Landing-page';
import NavBar from './Navbar';

const App = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={LandingPage} />
    </div>
  </Router>
);

export default App;
