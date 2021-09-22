import React from 'react';

import { Link } from 'react-router-dom';

const Bars = () => {
  return (
    <div className="bars">
      <Link className="bar">
        <p className="title">Pet Education</p>
        <p className="sub">
          Would you like to learn how to take care of your pets better? Join on
          Professional Sessions.
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Events</p>
        <p className="sub">
          Everyday there is new events happening for you and your pets (Online /
          Offline)
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Find Friends for Your Pets</p>
        <p className="sub">
          Would your pet like to meet new friends? Find pet owners to walk
          together.
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Lost Your Pet?</p>
        <p className="sub">
          Do not worry. Checkout 'Losts' page using our enchanced filtering, or
          request for your pet to be found by putting a reward.
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Want to Own a Pet?</p>
        <p className="sub">
          Connect to trusted and known Animal Shelters and easily own a pet of
          your choice.
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Store</p>
        <p className="sub">
          Toys, food, educational books/magazines, kennel, or anything your pet
          would love can be found here.
        </p>
      </Link>
      <Link className="bar">
        <p className="title">Need a Pet Lover?</p>
        <p className="sub">
          Do you need someone to lookout or walk your pet during the day?
        </p>
      </Link>
    </div>
  );
};

export default Bars;
