import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const COMPANY_NAME = 'YourCompanyName'; // Set your static company name

const ThankYou = () => {
  const location = useLocation();
  const { customer } = location.state || {}; // Get customer from state

  if (!customer) {
    return <Typography variant="h5">No customer details found.</Typography>;
  }

  const whatsappMessage = `Hello Mr. ${customer.name},\n
  This message is to inform you that, you have been successfully added as a customer at ${COMPANY_NAME}.\n
  Please verify your details:\n
  Name: ${customer.name}\n
  Age: ${customer.age}\n
  Email: ${customer.email}\n
  Phone: ${customer.phone}\n
  If the details are correct, reply with "CORRECT".\n
  If any changes need to be made, reply with "To be Changed".\n
  Please reply within 48 hours, or we will assume your reply as "CORRECT".\n
  Thanks and regards,\n
  Team ${COMPANY_NAME}`;

  const whatsappLink = `https://wa.me/${customer.phone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Thank You!
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hello {customer.name}, you have been successfully added as a customer.
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Please verify your details and click the button below to send a WhatsApp message to confirm.
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send WhatsApp Message
        </Button>
      </Box>
    </Container>
  );
};

export default ThankYou;
