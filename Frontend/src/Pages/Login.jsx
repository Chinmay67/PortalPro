import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const Login = () => {
  const handleLogin = () => {
    // Implement Google OAuth login
    window.location.href = 'http://localhost:3000/auth/google'; // Replace with actual backend route
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login to PortalPro
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login with Google
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
