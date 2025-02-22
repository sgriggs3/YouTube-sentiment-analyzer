import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingState from '../components/LoadingState';
import SentimentChart from '../components/visualizations/SentimentChart';
import SentimentTrendChart from '../components/visualizations/SentimentTrendChart'; // Import SentimentTrendChart
import api from '../services/api';
import VideoMetadata from '../components/VideoMetadata';
import Toast from '../webui/components/modern/Toast'; // Import Toast

const Analysis = () => {
  const { videoId } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('pie'); // State for chart type, default to 'pie'
  const [toastOpen, setToastOpen] = useState(false); // Toast state
  const [toastMessage, setToastMessage] = useState(''); // Toast message state

  const handleToastClose = () => {
    setToastOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const analysisData = await api.getVideoAnalysis(videoId); // Use getVideoAnalysis
        const metadata = analysisData.metadata;
        const sentiment = analysisData.sentiment_analysis;
        const trends = analysisData.sentiment_trends;

        setData({ metadata, sentiment, trends }); // Extract sentiment and trends from response
      } catch (err) {
        setError(err.message);
        setToastMessage(`Error analyzing video: ${err.message}`); // Set toast message
        setToastOpen(true); // Open toast
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchData();
    }
  }, [videoId]);

  if (loading) {
    return <LoadingState message="Analyzing video..." />;
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Analysis Results
          </Typography>
          {data && (
            <>
              <Box sx={{ mb: 2 }}>
                <Button variant={chartType === 'pie' ? 'contained' : 'outlined'} onClick={() => setChartType('pie')} sx={{ mr: 1 }}>
                  Sentiment Pie Chart
                </Button>
                <Button variant={chartType === 'trend' ? 'contained' : 'outlined'} onClick={() => setChartType('trend')}>
                  Sentiment Trend Chart
                </Button>
              </Box>

              {chartType === 'pie' && <SentimentChart data={data.sentiment} />}
              {chartType === 'trend' && <SentimentTrendChart data={data.trends} />}

              <Paper sx={{ p: 3, mb: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Video Metadata
                </Typography>
                <VideoMetadata metadata={data.metadata} />
              </Paper>
            </>
          )}
        </Box>
        <Toast
          open={toastOpen}
          message={toastMessage}
          severity="error"
          onClose={handleToastClose}
        />
      </Container>
    </ErrorBoundary>
  );
};

export default Analysis;
