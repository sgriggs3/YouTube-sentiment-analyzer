// frontend/src/components/VideoInput.js
import React, { useState } from 'react';

function VideoInput({ onUrlSubmit }) {
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onUrlSubmit(videoUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter YouTube Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button type="submit">Analyze</button>
        </form>
    );
}

export default VideoInput;