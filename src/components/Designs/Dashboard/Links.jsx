import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/Links.css';

const Links = () => {
  return (
    <div>
      <NavLink to="/glass/shop" className="link" activeClassName="current">
        <img src="./images/market.png" alt="" />
        <h2>Shop</h2>
      </NavLink>
      <NavLink to="/glass/events" className="link" activeClassName="current">
        <img src="./images/Events.png" alt="" />
        <h2>Events</h2>
      </NavLink>
      <NavLink to="/glass/meet-up" className="link" activeClassName="current">
        <img src="./images/upcoming.png" alt="" />
        <h2>Meet-Up</h2>
      </NavLink>
      <NavLink
        to="/glass/find-your-pet"
        className="link"
        activeClassName="current"
      >
        <img src="./images/find.png" alt="" />
        <h2>Find Your Pet</h2>
      </NavLink>
      <NavLink
        to="/glass/have-a-pet"
        className="link"
        activeClassName="current"
      >
        <img src="./images/pet.png" alt="" />
        <h2>Have a Pet</h2>
      </NavLink>
      <NavLink to="/glass/learning" className="link" activeClassName="current">
        <img src="./images/learning.png" alt="" />
        <h2>Learning</h2>
      </NavLink>
      <NavLink to="/glass/petter" className="link" activeClassName="current">
        <img src="./images/petter.png" alt="" />
        <h2>Petter</h2>
      </NavLink>
    </div>
  );
};

export default Links;
