import React, { useEffect, useRef } from 'react';
//styles
import './styles/Video.css';

const Video = ({ peer }) => {
  const videoRef = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return <video className="styledVideo" playsInline autoPlay ref={videoRef} />;
};

export default Video;
