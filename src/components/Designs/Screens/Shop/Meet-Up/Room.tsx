import React from 'react';
import Chat from './Chat';
import ControlBar from './ControlBar';
import Screens from './Screens';
import useScreenType from './hooks/useScreenType';

const Room = () => {
  const screenType = useScreenType();

  return (
    <div>
      <div className={screenType}>
        <Screens />
        <ControlBar />
      </div>
      <div className="sidebar">
        <Chat />
      </div>
    </div>
  );
};

export default Room;
