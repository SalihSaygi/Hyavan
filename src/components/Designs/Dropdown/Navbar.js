import React from 'react';
import './styles/Navbar.module.css';

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <ul className="navbarNav">{children}</ul>
    </nav>
  );
};

export default Navbar;
