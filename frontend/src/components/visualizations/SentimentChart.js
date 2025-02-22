import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';

const SentimentChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const plotData = [{
    values: [
      data.filter(d => d.sentiment > 0).length,
      data.filter(d => d.sentiment < 0).length,
      data.filter(d => d.sentiment === 0).length
    ],
    labels: ['Positive', 'Negative', 'Neutral'],
    type: 'pie',
    hoverinfo: 'label+percent+value', // Add tooltip info
    marker: {
      colors: ['#4CAF50', '#f44336', '#9e9e9e']
    }
  }];

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sentiment Distribution
      </Typography>
      <Box sx={{ height: '400px' }}>
        <Plot
          data={plotData}
          layout={{
            height: 380,
            margin: { t: 0, b: 0, l: 0, r: 0 },
            showlegend: true
          }}
          config={{ responsive: true }}
        />
      </Box>
    </Paper>
  );
};

export default SentimentChart;
