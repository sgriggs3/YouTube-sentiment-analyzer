import React, { useState } from 'react';

function VideoInput({ onVideoSubmit }) {
  const [videoId, setVideoId] = useState('');

  const handleChange = (event) => {
    setVideoId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onVideoSubmit(videoId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="video-id">YouTube Video URL or ID:</label>
        <input
          type="text"
          id="video-id"
          value={videoId}
          onChange={handleChange}
          placeholder="Enter YouTube video URL or ID"
        />
        <button type="submit">Analyze</button>
      </form>
    </div>
  );
}

export default VideoInput;