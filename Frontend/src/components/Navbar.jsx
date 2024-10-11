import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { checkUser, userAtom } from '../atoms/userAtom';
import axios from '../../api/axios';

const Navbar = () => {
  const [userStatus, setUserStatus] = useRecoilState(checkUser);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get('/auth/logout');  // Logout API call
      console.log(response);
      
      // Clear user state
      setCurrentUser(null);
      setUserStatus(false);

      // Navigate back to homepage after successful logout
      navigate('/');
    } catch (error) {
      console.log('Logout error:', error);
    }
    window.location.href = '/';
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PortalPro
          </Typography>
          <Box>
            {userStatus === false ? (
              <Box>
                <Button color="inherit" component={RouterLink} to="/login">
                  Login/Signup
                </Button>
              </Box>
            ) : currentUser.isAdmin === true ? (
              <Box>
                <Button color="inherit" component={RouterLink} to="/admin/logs">
                  See Logs
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Box>
                <Button color="inherit" component={RouterLink} to="/customers/create">
                  Add Customers
                </Button>
                <Button color="inherit" component={RouterLink} to="/customers">
                  Customers
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
