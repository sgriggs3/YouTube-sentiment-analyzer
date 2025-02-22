import React, { useState } from 'react';
import './App.css'; // You might need to create this file for basic styling

function VideoInput({ onVideoIdSubmit }) {
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Extract video ID from URL (basic implementation, needs improvement)
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (videoId) {
      onVideoIdSubmit(videoId);
    } else {
      alert('Invalid YouTube URL');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        YouTube Video URL:
        <input type="text" value={videoUrl} onChange={handleChange} />
      </label>
      <button type="submit">Analyze</button>
    </form>
  );
}

function App() {
  const [sentimentData, setSentimentData] = useState(null);

  const handleVideoIdSubmit = async (videoId) => {
    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_id: videoId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Assuming the backend returns data in the format: { sentiment_counts: { positive: 10, negative: 5, neutral: 2 } }
      setSentimentData(data.sentiment_counts);
    } catch (error) {
      console.error('Error fetching sentiment data:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Sentiment Analyzer</h1>
        <VideoInput onVideoIdSubmit={handleVideoIdSubmit} />
        {sentimentData ? (
          <div>
            <h2>Sentiment Analysis Results</h2>
            {/* Placeholder for Sentiment Chart */}
            <p>Positive: {sentimentData.positive}</p>
            <p>Negative: {sentimentData.negative}</p>
            <p>Neutral: {sentimentData.neutral}</p>
          </div>
        ) : (
          <p>Enter a YouTube video URL to analyze.</p>
        )}
      </header>
    </div>
  );
}

export default App;