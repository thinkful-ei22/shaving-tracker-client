import React from 'react';
import './styles/navbar.css';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <h1><Link className='home-nav' to="/">Home</Link></h1>
  )
}

export default NavBar;