import React from 'react';
//styles
import './styles/Screen.css';
//hook
import useSocket from './hooks/useSocket';
//components
import Video from './Video';

const Screens = props => {
  const roomID = props.match.params.roomID;
  const { peers, userVideo } = useSocket(roomID);

  return (
    <div>
      <Video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
    </div>
  );
};

export default Screens;
