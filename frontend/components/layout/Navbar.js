import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from '../../ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = () => {
  const { currentTheme, setTheme } = useContext(CustomThemeContext);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const results = await api.searchVideos(searchQuery);
        console.log('Search results:', results); // Log results to console for now
        // TODO: Implement UI to display search results
      } catch (error) {
        console.error('Search error:', error);
        // TODO: Handle search error (e.g., display error message)
      }
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            YouTube Insight Analyzer
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Added Box for search and buttons */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search videos..."
            value={searchQuery} // Bind value to state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
            onKeyPress={(e) => { // Handle Enter key press for search
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            sx={{ mr: 2, bgcolor: 'white', borderRadius: 1 }}
          />
          <Button color="inherit" component={Link} to="/analysis">
            Analysis
          </Button>
          <Button color="inherit" component={Link} to="/settings">
            Settings
          </Button>
          <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleTheme}>
            {currentTheme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
