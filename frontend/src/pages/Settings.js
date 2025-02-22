import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box
} from '@mui/material';
import api from '../services/api';

const Settings = () => {
  const [settings, setSettings] = useState({
    youtubeApiKey: '',
    enableRealTimeAnalysis: false,
    enableNotifications: false,
    customBaseUrl: '',
    apiProvider: '',
    modelSelection: '',
    additionalSettings: '',
    theme: 'light',
  });

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await api.getProviders();
        setProviders(response);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: e.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      await api.saveSettings(settings);
      localStorage.setItem('settings', JSON.stringify(settings));
      setTheme(settings.theme);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Settings</Typography>
        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            label="YouTube API Key"
            name="youtubeApiKey"
            value={settings.youtubeApiKey}
            onChange={handleChange}
            margin="normal"
            type="password"
          />

          <Select
            fullWidth
            name="apiProvider"
            label="API Provider"
            value={settings.apiProvider}
            onChange={handleChange}
            margin="normal"
          >
            {providers.map(provider => (
              <MenuItem key={provider} value={provider}>{provider}</MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            label="Model Selection"
            name="modelSelection"
            value={settings.modelSelection}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Additional Settings"
            name="additionalSettings"
            value={settings.additionalSettings}
            onChange={handleChange}
            margin="normal"
          />

          <Select
            fullWidth
            name="theme"
            label="Theme"
            value={settings.theme}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>

          <TextField
            fullWidth
            label="Custom Base URL"
            name="customBaseUrl"
            value={settings.customBaseUrl}
            onChange={handleChange}
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.enableRealTimeAnalysis}
                onChange={handleChange}
                name="enableRealTimeAnalysis"
              />
            }
            label="Enable Real-time Analysis"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.enableNotifications}
                onChange={handleChange}
                name="enableNotifications"
              />
            }
            label="Enable Notifications"
          />

          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={handleSave}>
              Save Settings
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            For more information about API keys and settings, please visit the{' '}
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
              API Provider Documentation
            </a>.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
