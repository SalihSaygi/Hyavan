import React from 'react';
import './VideoFooter.css';
import LabelIcon from '@material-ui/icons/Label';

function VideoFooter({ description, tag }) {
  return (
    <div className="videoFooter">
      <div className="videoFooter__text">
        <p>{description}</p>
        <LabelIcon>{tag}</LabelIcon>
      </div>
    </div>
  );
}

export default VideoFooter;
