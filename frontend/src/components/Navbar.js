// This is a new file

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/real-time-analysis">Real-Time Analysis</Link></li>
        <li><Link to="/user-feedback">User Feedback</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;