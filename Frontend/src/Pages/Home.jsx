import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Container sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to PortalPro
      </Typography>
      <Typography variant="h5" gutterBottom>
        Streamline your user management and customer services with ease.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage your customers, view admin logs, and integrate with your business effortlessly. 
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/signup"
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
