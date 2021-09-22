import React, { useState } from 'react';
import './VideoSidebar.css';
import MessageIcon from '@material-ui/icons/Message';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import IconButton from '@material-ui/core/IconButton';
import useLocalStorage from './hooks/useLocalStorage';

function VideoSidebar({ shares, messages, videoId }) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedVideos, setSavedVideos] = useLocalStorage('savedVideo', 'url');

  const handleSave = () => {
    if (isSaved) {
      setSavedVideos(savedVideos.filter(id => id !== videoId));
      setIsSaved(false);
    }
    setSavedVideos(videoId);
    setIsSaved(true);
  };

  return (
    <div className="videoSidebar">
      <div className="videoSidebar__button">
        <MessageIcon fontSize="large" />
        <p>{messages}</p>
      </div>
      <div className="videoSidebar__button">
        <ShareIcon fontSize="large" />
        <p>{shares}</p>
      </div>
      <IconButton onClick={handleSave}>
        {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </div>
  );
}

export default VideoSidebar;
