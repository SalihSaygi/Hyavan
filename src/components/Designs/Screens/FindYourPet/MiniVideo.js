import React, { useState, useRef } from 'react';

const MiniVideo = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const onVideoMouseEnter = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const onVideoMouseLeave = () => {
    videoRef.current.pause();
    setPlaying(false);
  };

  return (
    <div>
      <div className="mini-video">
        <video
          className="mini-video__player"
          loop
          onMouseEnter={onVideoMouseEnter}
          onMouseLeave={onVideoMouseLeave}
          ref={videoRef}
          src={url}
        ></video>
      </div>
    </div>
  );
};

export default MiniVideo;
