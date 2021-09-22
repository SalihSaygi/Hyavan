import React, { useState, useEffect } from 'react';
import Video from './Video';
import './App.css';
import axios from './axios';

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchPost() {
      const response = await axios.get('/v2/posts');
      setVideos(response.data);

      return response;
    }

    fetchPost();
  }, []);

  console.log(videos);

  return (
    // BEM
    <div className="app">
      <div className="app__videos">
        {videos.map(({ url, description, messages, shares, tag }) => (
          <Video
            url={url}
            messages={messages}
            description={description}
            shares={shares}
            tag={tag}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
