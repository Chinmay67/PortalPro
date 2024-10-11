import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#ff4081', // Custom secondary color
    },
    background: {
      default: '#f4f6f8', // Light grey background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Rounded buttons
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px 0',
        },
      },
    },
  },
});

export default theme;
