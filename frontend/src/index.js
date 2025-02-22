import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can keep or remove this
import VideoAnalyzer from './components/VideoAnalyzer'; // Import VideoAnalyzer

ReactDOM.render(
  <React.StrictMode>
    <VideoAnalyzer /> {/* Render VideoAnalyzer component */}
  </React.StrictMode>,
  document.getElementById('root')
);
