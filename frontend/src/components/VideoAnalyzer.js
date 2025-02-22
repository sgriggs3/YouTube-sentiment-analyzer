// frontend/src/components/VideoAnalyzer.js
import React, { useState } from 'react';
import VideoInput from './VideoInput';
import SentimentChart from './SentimentChart';
import { fetchSentimentAnalysis } from '../services/api';

function VideoAnalyzer() {
    const [sentimentData, setSentimentData] = useState(null);
    const [error, setError] = useState(null);

    const handleUrlSubmit = async (videoUrl) => {
        setError(null);
        try {
            const data = await fetchSentimentAnalysis(videoUrl);
            setSentimentData(data.sentiment);
        } catch (err) {
            setError("Failed to analyze sentiment. Please check the URL and backend server.");
            setSentimentData(null);
        }
    };

    return (
        <div>
            <h1>YouTube Sentiment Analyzer</h1>
            <VideoInput onUrlSubmit={handleUrlSubmit} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {sentimentData && <SentimentChart sentimentData={sentimentData} />}
        </div>
    );
}

export default VideoAnalyzer;
