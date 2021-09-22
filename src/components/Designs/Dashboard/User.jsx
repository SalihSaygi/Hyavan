import React from 'react';
import '../styles/User.css';
import avatar from '../../../Images/avatar.png';
import store from '../../Context/store';

const User = () => {
  const { user } = store;

  return (
    <div class="user">
      <img src={avatar} alt="" />
      <p className="name">{user.username}</p>
      <p className="memberType">{user.memberType}</p>
    </div>
  );
};

export default User;
