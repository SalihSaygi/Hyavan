/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './styles/Item.module.css';

const Item = ({ icon, children }) => {
  const [open, setOpen] = useState(false);
  const handleClick = e => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <li className="navItem">
      <a href="#" className="iconButton" onClick={handleClick}>
        {icon}
      </a>
      {open && children}
    </li>
  );
};

export default Item;
