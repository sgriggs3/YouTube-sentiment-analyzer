import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Analysis from './pages/Analysis';
import SentimentResults from './pages/SentimentResults'; // Import the new component
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/layout/Layout';
import './App.css';
import CustomThemeProvider from './ThemeContext';

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis/:videoId?" element={<Analysis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/sentiment-results" element={<SentimentResults />} /> {/* Add new route */}
            </Routes>
          </Layout>
        </Router>
      </ErrorBoundary>
    </CustomThemeProvider>
  );
}

export default App;