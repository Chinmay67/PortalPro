import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';  // Import RouterLink
import axios from 'axios';
import { fetchAdminLogs } from '../../api/adminService';
import { useRecoilValue } from 'recoil';
import { checkUser, userAtom } from '../atoms/userAtom';

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const currentUser = useRecoilValue(userAtom);
  const userStatus = useRecoilValue(checkUser);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetchAdminLogs(); // Replace with actual API endpoint
        console.log(response);
        setLogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    
    if (userStatus && currentUser.isAdmin) {
      fetchLogs(); // Only fetch logs if the user is an admin
    }
  }, [userStatus, currentUser]);

  return (
    <Container>
      {userStatus && currentUser.isAdmin ? (
        <>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Admin Logs
          </Typography>
          <Box>
            <List>
              {logs.map((log) => (
                <ListItem key={log.id}>
                  <ListItemText
                    primary={log.action}
                    secondary={`Performed by User ID: ${log.userId} at ${new Date(log.timestamp).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      ) : (
        <Button color="inherit" component={RouterLink} to="/login">
          Login/Signup
        </Button>
      )}
    </Container>
  );
};

export default AdminLogs;
