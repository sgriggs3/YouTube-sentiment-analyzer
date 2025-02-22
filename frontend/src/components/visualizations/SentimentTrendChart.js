import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';

const SentimentTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const plotData = [{
    x: data.map(item => item.time),
    y: data.map(item => item.sentiment),
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color: 'blue' },
  }];

  const layout = {
    title: 'Sentiment Trend Over Time',
    xaxis: { title: 'Time' },
    yaxis: { title: 'Average Sentiment' },
    height: 400,
    margin: { t: 60, b: 60, l: 60, r: 60 },
    responsive: true
  };

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sentiment Trend Over Time
      </Typography>
      <Box sx={{ height: '400px' }}>
        <Plot
          data={plotData}
          layout={layout}
          config={{ responsive: true }}
        />
      </Box>
    </Paper>
  );
};

export default SentimentTrendChart;