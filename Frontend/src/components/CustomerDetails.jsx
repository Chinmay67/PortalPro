import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';  // Icon for the edit button
import { Link as RouterLink } from 'react-router-dom';  // Import RouterLink
import { fetchCustomers, updateCustomerById } from '../../api/userService';  // Ensure you have this API function
import { useRecoilValue } from 'recoil';  // Recoil for state management
import { checkUser, userAtom } from '../atoms/userAtom';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);  // To store the selected customer
  const [open, setOpen] = useState(false);  // Dialog state
  const [errors, setErrors] = useState({});  // State to manage form errors
  const userStatus = useRecoilValue(checkUser);  // Get userStatus from Recoil
  const currentUser = useRecoilValue(userAtom);  // Get currentUser from Recoil

  // Fetch customers once when component loads
  useEffect(() => {
    const fetchAllCustomers = async () => {
      try {
        const response = await fetchCustomers();
        console.log(response);
        setCustomers(response.data.customers);
      } catch (error) {
        console.log(error);
      }
    };

    if (userStatus) {
      fetchAllCustomers();
    }
  }, [userStatus]);

  // Handle opening the dialog and setting the selected customer
  const handleOpen = (customer) => {
    console.log('Opening dialog for customer:', customer);
    setSelectedCustomer(customer);
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => {
    console.log('Closing dialog');
    setOpen(false);
    setSelectedCustomer(null);  // Reset selected customer when dialog is closed
  };

  // Handle input changes and validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const validateField = (field, value) => {
    let tempErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value) {
          tempErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          tempErrors.name = 'Name can only contain letters and spaces';
        } else {
          delete tempErrors.name;
        }
        break;

      case 'email':
        if (!value) {
          tempErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          tempErrors.email = 'Email is invalid';
        } else {
          delete tempErrors.email;
        }
        break;

      case 'phone':
        if (!value) {
          tempErrors.phone = 'Phone is required';
        } else if (!/^\d{10}$/.test(value)) {
          tempErrors.phone = 'Phone must be 10 digits';
        } else {
          delete tempErrors.phone;
        }
        break;

      case 'age':
        if (!value) {
          tempErrors.age = 'Age is required';
        } else if (isNaN(value) || value <= 0) {
          tempErrors.age = 'Age must be a positive number';
        } else {
          delete tempErrors.age;
        }
        break;

      case 'gender':
        if (!value) {
          tempErrors.gender = 'Gender is required';
        } else {
          delete tempErrors.gender;
        }
        break;

      default:
        break;
    }

    setErrors(tempErrors);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);  // Validate the field on blur
  };

  // Handle form submission
  const handleFormSubmit = async () => {
    if (Object.keys(errors).length === 0) {
      try {
        if (selectedCustomer) {
          console.log('Updating customer:', selectedCustomer);
          const response = await updateCustomerById(selectedCustomer.id, selectedCustomer);  // Call the API to update the customer
          console.log('Update response:', response);

          // Update the customer in the list
          setCustomers(customers.map(c => (c.id === selectedCustomer.id ? selectedCustomer : c)));

          // After successful update, close the dialog
          handleClose();
        }
      } catch (error) {
        console.log("Error updating customer:", error);
      }
    }
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      selectedCustomer &&
      selectedCustomer.name &&
      /^[A-Za-z\s]+$/.test(selectedCustomer.name) &&  // Name validation: only letters and spaces
      selectedCustomer.email &&
      /\S+@\S+\.\S+/.test(selectedCustomer.email) &&  // Email validation
      selectedCustomer.phone &&
      /^\d{10}$/.test(selectedCustomer.phone) &&  // Phone validation: 10 digits
      selectedCustomer.age &&
      !isNaN(selectedCustomer.age) &&  // Age validation
      selectedCustomer.gender &&
      Object.keys(errors).length === 0  // No validation errors
    );
  };

  return (
    <Container>
      {userStatus ? (
        <>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Customer Details
          </Typography>
          <Box>
            <List>
              {customers.map((customer) => (
                <ListItem key={customer.id}>
                  <ListItemText
                    primary={customer.name}
                    secondary={`Email: ${customer.email}, Phone: ${customer.phone}, Age: ${customer.age}, Gender: ${customer.gender}`}
                  />
                  {/* Edit Button to open the dialog */}
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(customer)}>
                    <EditIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Dialog for editing customer details */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Customer Details</DialogTitle>
            <DialogContent>
              {selectedCustomer && (
                <>
                  <TextField
                    margin="dense"
                    label="Name"
                    name="name"
                    fullWidth
                    value={selectedCustomer.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    fullWidth
                    value={selectedCustomer.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    margin="dense"
                    label="Phone"
                    name="phone"
                    fullWidth
                    value={selectedCustomer.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                  <TextField
                    margin="dense"
                    label="Age"
                    name="age"
                    fullWidth
                    value={selectedCustomer.age}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.gender} required>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={selectedCustomer.gender}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="others">Others</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} color="primary" variant="contained" disabled={!isFormValid()}>
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <Button color="inherit" component={RouterLink} to="/login">
          Login/Signup
        </Button>
      )}
    </Container>
  );
};

export default CustomerDetails;
