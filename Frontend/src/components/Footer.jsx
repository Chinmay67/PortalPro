import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2">Made by Chinmay Singh</Typography>
      </Container>
    </Box>
  );
};

export default Footer;
