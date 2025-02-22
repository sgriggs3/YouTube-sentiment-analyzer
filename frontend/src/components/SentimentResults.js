import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import SentimentTrendChart from './visualizations/SentimentTrendChart';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SentimentResults = ({ results }) => {
  const { videoData, sentimentResults } = results;
  const { summary } = sentimentResults;

  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [
        summary.sentiment_distribution.positive,
        summary.sentiment_distribution.neutral,
        summary.sentiment_distribution.negative
      ],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
    }]
  };

  return (
    <div className="sentiment-results">
      <h2>{videoData.title}</h2>
      <div className="video-stats">
        <p>Views: {videoData.views}</p>
        <p>Comments: {videoData.commentCount}</p>
      </div>
      
      <div className="charts">
        <div className="chart-container">
          <h3>Sentiment Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-container">
          <h3>Sentiment Trend Over Time</h3>
          <SentimentTrendChart data={results.sentimentResults.trendData} />
        </div>
      </div>

      <div className="comments-list">
        <h3>Recent Comments</h3>
        {sentimentResults.comments.map((comment, index) => (
          <div key={index} className={`comment ${comment.category}`}>
            <p>{comment.text}</p>
            <small>
              By {comment.author} | Sentiment: {comment.category}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentResults;
