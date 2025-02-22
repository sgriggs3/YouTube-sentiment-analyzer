import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VideoInput from './VideoInput';
import VideoDisplay from './VideoDisplay';
import CommentsDisplay from './CommentsDisplay';
import SettingsPage from './SettingsPage';
import ChatboxPage from './ChatboxPage';
import './App.css'; // Import the CSS file

function App() {
  const [videoData, setVideoData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);

  const handleVideoSubmit = async (videoId) => {
    try {
      const videoResponse = await fetch(`/api/video-metadata/${videoId}`);
      const videoResult = await videoResponse.json();
      if (videoResponse.ok) {
        setVideoData(videoResult);
      } else {
        console.error('Error fetching video data:', videoResult.error);
        // Handle error (e.g., display an error message to the user)
      }

      const commentsResponse = await fetch(`/api/comments?urlOrVideoId=${videoId}`);
      const commentsResult = await commentsResponse.json();
      if (commentsResponse.ok) {
        setCommentsData(commentsResult);
      } else {
        console.error('Error fetching comments data:', commentsResult.error);
        // Handle error
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
    }
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/chatbox">Chatbox</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="content">
              <h1>YouTube Sentiment Analysis</h1>
              <VideoInput onVideoSubmit={handleVideoSubmit} />
              {videoData && <VideoDisplay videoData={videoData} />}
              {commentsData && <CommentsDisplay comments={commentsData} />}
            </div>
          } />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chatbox" element={<ChatboxPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;