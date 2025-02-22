import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';

const SentimentTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Typography variant="h6" gutterBottom>
        Sentiment Trend Over Time
      </Typography>
      <Box sx={{ height: '400px' }}>
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sentimentScore" stroke="#8884d8" />
        </LineChart>
      </Box>
    </Paper>
  );
};

export default SentimentTrendChart;
