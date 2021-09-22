import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './header.css';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const Header = ({ history, isLogged }) => {
  return (
    <nav>
      <div className="div-header">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <NavLink exact to="/" activeClassName="active">
            <p>Find Your Pet</p>
          </NavLink>
          <NavLink exact to="/explore" activeClassName="active">
            <BookmarksIcon className="div-svg" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Header);
