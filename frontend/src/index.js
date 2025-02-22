import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // You can keep or remove this
import VideoAnalyzer from './components/VideoAnalyzer'; // Import VideoAnalyzer
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <VideoAnalyzer /> {/* Render VideoAnalyzer component */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
