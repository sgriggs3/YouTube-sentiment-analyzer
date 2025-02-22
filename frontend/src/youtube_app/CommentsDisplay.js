import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Plot from 'react-plotly.js';

function CommentsDisplay({ comments, chartType }) {
  if (!comments || comments.length === 0) {
    return <div>No comments to display.</div>;
  }

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <Plot
            data={[
              {
                x: comments.map((comment, index) => `Comment ${index + 1}`),
                y: comments.map(comment => comment.sentiment.compound),
                type: 'bar',
                marker: { color: '#8884d8' },
              },
            ]}
            layout={{ title: 'Sentiment Bar Chart' }}
          />
        );
      case "pie":
        const sentimentCounts = comments.reduce((acc, comment) => {
          const sentiment = comment.sentiment.compound >= 0.05 ? 'Positive' : comment.sentiment.compound <= -0.05 ? 'Negative' : 'Neutral';
          acc[sentiment] = (acc[sentiment] || 0) + 1;
          return acc;
        }, {});
        return (
          <Plot
            data={[
              {
                values: Object.values(sentimentCounts),
                labels: Object.keys(sentimentCounts),
                type: 'pie',
                marker: { colors: ["#8884d8", "#82ca9d", "#ffc658"] },
              },
            ]}
            layout={{ title: 'Sentiment Pie Chart' }}
          />
        );
      case "line":
      default:
        return (
          <Plot
            data={[
              {
                x: comments.map((comment, index) => `Comment ${index + 1}`),
                y: comments.map(comment => comment.sentiment.compound),
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#8884d8' },
              },
            ]}
            layout={{ title: 'Sentiment Line Chart' }}
          />
        );
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            <p>Comment: {comment.text}</p>
            <p>Sentiment: {JSON.stringify(comment.sentiment)}</p>
          </li>
        ))}
      </ul>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CommentsDisplay;
