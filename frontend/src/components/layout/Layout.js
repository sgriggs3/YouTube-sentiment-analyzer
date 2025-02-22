import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import PageTransition from './PageTransition'; // Import PageTransition

const Layout = ({ children }) => {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <Navbar />
      <PageTransition> {/* Wrap Container with PageTransition */}
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            py: 4,
            px: { xs: 2, sm: 3 }
          }}
        >
          {children}
        </Container>
      </PageTransition>
    </Box>
  );
};

export default Layout;
