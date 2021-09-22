import React from 'react';

// import Extra from './Extra';
import Links from './Links';
import User from './User';

import '../styles/dashboard.css';

export const Main = () => {
  return (
    <div className="dashboard">
      <User />
      <Links />
      {/* <Extra /> */}
    </div>
  );
};
