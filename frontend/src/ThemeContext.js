import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

export const CustomThemeContext = createContext({
  currentTheme: 'light',
  setTheme: () => {}
});

const CustomThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('theme') || 'light'; // Get theme from local storage or default to light
  const [themeName, setThemeName] = useState(storedTheme);
  const theme = useMemo(() => {
    return themeName === 'light' ? lightTheme : darkTheme;
  }, [themeName]);

  useEffect(() => {
    localStorage.setItem('theme', themeName); // Update local storage on theme change
  }, [themeName]);

  return (
    <CustomThemeContext.Provider value={{ currentTheme: themeName, setTheme: setThemeName }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
