import React from 'react';
import User from './userDetails';

const Users = ({ dataList }) => {
  return (
    <>
      <ul>
        {dataList.map(user => {
          if (user) {
            return (
              <li key={user.githubId}>
                <User user={user} />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

export default Users;
