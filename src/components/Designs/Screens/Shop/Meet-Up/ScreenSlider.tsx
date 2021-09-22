import React from 'react';
import SchemedButton from './UI/Button/SchemedButton';
import { ScreenIcon } from '@material-ui/core/Icon';

const ScreenSlider = () => {
  return (
    <div>
      <SchemedButton size={'small'} icon={<ScreenIcon />} />
      <ul>
        <li className="list">
          <span className="icon"></span>
          <span className="title">Everyone</span>
        </li>
        <li className="list">
          <span className="icon"></span>
          <span className="title">Hangout</span>
        </li>
        <li className="list">
          <span className="icon"></span>
          <span className="title">One</span>
        </li>
        <li className="list">
          <span className="icon"></span>
          <span className="title">Screen Stream</span>
        </li>
      </ul>
    </div>
  );
};

export default ScreenSlider;
