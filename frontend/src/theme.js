export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9', // Brighter blue (same as before)
      light: '#E3F2FD',
      dark: '#42A5F5',
    },
    secondary: {
      main: '#CE93D8', // Purple-pink
      light: '#F3E5F5',
      dark: '#AB47BC',
    },
    background: {
      default: '#303030', // Dark gray (same as before)
      paper: '#424242', // Slightly lighter dark gray (same as before)
    },
    text: {
      primary: '#ffffff', // White (same as before)
      secondary: '#B0BEC5', // Light gray
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Reduced shadow
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none', // Remove shadow for flatter look
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)', // Lighter outline for dark theme
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.3)', // Slightly brighter on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90CAF9', // Primary color when focused
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 24px',
          transition: 'background-color 0.2s ease', // Add transition
          '&:hover': {
            backgroundColor: '#5e5e5e', // Slightly lighter on hover
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Add subtle shadow
          },
        },
      },
    },
  },
  custom: {
    primaryBg: '#121212',
    secondaryBg: '#1e1e1e',
    accentColor: '#bb86fc',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.7)',
    errorColor: '#cf6679',
    successColor: '#03dac6',
  },
});
