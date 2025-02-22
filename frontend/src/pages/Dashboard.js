import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent,
  Grid,
  TextField, 
  Button, 
  Typography,
  IconButton,
} from '@mui/material';
import { YouTube, History, TrendingUp, Settings } from '@mui/icons-material';
import api from '../services/api';
import Toast from '../webui/components/modern/Toast'; // Import Toast

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoUrlError, setVideoUrlError] = useState(false); // State for video URL error
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [toastOpen, setToastOpen] = useState(false); // Toast state
  const [toastMessage, setToastMessage] = useState(''); // Toast message state
  const navigate = useNavigate();

  const handleToastClose = () => {
    setToastOpen(false);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await api.getProviders();
        setProviders(response);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setToastMessage(`Error fetching providers: ${error.message}`); // Set toast message
        setToastOpen(true); // Open toast
      }
    };

    fetchProviders();
  }, []);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!videoUrl) {
      setVideoUrlError(true);
      return;
    }
    setVideoUrlError(false);
    if (selectedProvider && selectedModel) {
      navigate(`/analysis/${encodeURIComponent(videoUrl)}?provider=${selectedProvider}&model=${selectedModel}`);
    }
  };

  const featuredCards = [
    { 
      title: 'Recent Analysis',
      icon: <History />,
      onClick: () => navigate('/history'),
    },
    {
      title: 'Trending Videos',
      icon: <TrendingUp />,
      onClick: () => navigate('/trending'),
    },
    {
      title: 'Settings',
      icon: <Settings />,
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Box>
      <Card sx={{ mb: 4, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Analyze YouTube Video Sentiment
          </Typography>
          <form onSubmit={handleAnalyze}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter YouTube Video URL or ID"
                  value={videoUrl}
                  error={videoUrlError} // Set error state
                  helperText={videoUrlError ? "Please enter a YouTube Video URL or ID" : null} // Error message
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                    setVideoUrlError(false); // Clear error on input change
                  }}
                  InputProps={{
                    startAdornment: <YouTube sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!videoUrl || !selectedProvider || !selectedModel}
                >
                  Analyze Video
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Select API Provider"
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select API Provider</option>
                  {providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Select Model"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">Select Model</option>
                  {selectedProvider && providers[selectedProvider]?.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {featuredCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={card.onClick}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <IconButton 
                  color="primary"
                  sx={{ mb: 2, p: 2, bgcolor: 'primary.light' }}
                >
                  {card.icon}
                </IconButton>
                <Typography variant="h6">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity="error"
        onClose={handleToastClose}
      />
    </Box>
  );
};

export default Dashboard;
