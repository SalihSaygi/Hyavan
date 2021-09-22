import React from 'react';
import useLocalStorage from './useLocalStorage';
import MiniVideo from './MiniVideo';

const SavedVideos = () => {
  const [savedVideos] = useLocalStorage('savedVideo', 'url');

  return (
    <div className="savedPage">
      <h1>Here you can see your saved videos. Note: Limit is 50.</h1>
      <div className="savedVideos">
        {savedVideos.map(({ url }) => (
          <MiniVideo url={url} />
        ))}
      </div>
    </div>
  );
};

export default SavedVideos;
