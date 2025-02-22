import React, { useState } from 'react';
import { analyzeVideo } from '../services/api';
import { toast } from 'react-toastify';
import SentimentResults from './SentimentResults';

const VideoAnalyzer = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = await analyzeVideo(videoUrl);
      setResults(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-analyzer">
      <form onSubmit={handleAnalyze}>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>

      {results && <SentimentResults results={results} />}
    </div>
  );
};

export default VideoAnalyzer;
