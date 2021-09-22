import React from 'react';
import { DogFaceIcon, EmptyDogFaceIcon } from './icons';

const Message = ({ isOwner, SenderImage, text, sentAt, isSeen }) => {
  return (
    <div className={isOwner ? 'message owner' : 'message respondender'}>
      <div className="msgHeader">
        <img className="msgImage" src={SenderImage} alt="Sender" />
        <p className="msgText">{text}</p>
      </div>
      <div className="msgBottom">
        {sentAt} | {isSeen ? <DogFaceIcon /> : <EmptyDogFaceIcon />}
      </div>
    </div>
  );
};

export default Message;
