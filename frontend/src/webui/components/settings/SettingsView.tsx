import React, { useState, useContext } from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { CustomThemeContext } from '../../../ThemeContext';
import { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles({
  card: {
    margin: '20px auto',
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
});

interface SettingsViewProps {
  onDone: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onDone }) => {
  const classes = useStyles();
  const [apiProvider, setApiProvider] = useState('');
  const { currentTheme, setTheme } = useContext(CustomThemeContext);

  const handleApiProviderChange = (event: SelectChangeEvent<string>) => {
    setApiProvider(event.target.value);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <div className="settings-container">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Modern Settings
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="api-provider-label">API Provider</InputLabel>
            <Select
              labelId="api-provider-label"
              id="api-provider-select"
              value={apiProvider}
              onChange={handleApiProviderChange}
            >
              <MenuItem value="openrouter">OpenRouter</MenuItem>
              <MenuItem value="anthropic">Anthropic</MenuItem>
              <MenuItem value="google_gemini">Google Gemini</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Enable Feature X"
          />
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Enable Tool Y"
          />
          <FormControlLabel
            control={
              <Switch
                checked={currentTheme === 'dark'}
                onChange={handleThemeChange}
                color="primary"
              />
            }
            label="Dark Mode"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
