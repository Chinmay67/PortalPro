import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import { createCustomer } from '../../api/userService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';  // Import Recoil hook
import { checkUser, userAtom } from '../atoms/userAtom';  // Import Recoil atoms

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});  // State to manage form errors
  const navigate = useNavigate();

  // Get userStatus and currentUser from Recoil
  const userStatus = useRecoilValue(checkUser);
  const currentUser = useRecoilValue(userAtom);

  // Validation logic for each field
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

  // Validate the form before submission
  const validateForm = () => {
    let tempErrors = {};
    if (!customer.name) tempErrors.name = "Name is required";
    if (!customer.email) tempErrors.email = "Email is required";
    if (!customer.phone) tempErrors.phone = "Phone is required";
    if (!customer.age) tempErrors.age = "Age is required";
    if (!customer.gender) tempErrors.gender = "Gender is required";

    setErrors(tempErrors);  // Set errors in the state
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);  // Validate the field on blur
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await createCustomer(customer);
        console.log(response);
        navigate('/thank-you', { state: { customer: response.data.customer } });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Validation failed', errors);  // Log errors if validation fails
    }
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      customer.name &&
      /^[A-Za-z\s]+$/.test(customer.name) &&  // Name validation: only letters and spaces
      customer.email &&
      /\S+@\S+\.\S+/.test(customer.email) &&  // Email validation
      customer.phone &&
      /^\d{10}$/.test(customer.phone) &&  // Phone validation: 10 digits
      customer.age &&
      !isNaN(customer.age) &&  // Age validation
      customer.gender &&
      Object.keys(errors).length === 0  // No validation errors
    );
  };

  return (
    <Container>
      {userStatus ? (
        <>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Create Customer
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              value={customer.name}
              onChange={handleChange}
              onBlur={handleBlur}  // Validate on blur
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              value={customer.email}
              onChange={handleChange}
              onBlur={handleBlur}  // Validate on blur
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              name="phone"
              label="Phone"
              fullWidth
              value={customer.phone}
              onChange={handleChange}
              onBlur={handleBlur}  // Validate on blur
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              name="age"
              label="Age"
              fullWidth
              value={customer.age}
              onChange={handleChange}
              onBlur={handleBlur}  // Validate on blur
              error={!!errors.age}
              helperText={errors.age}
              sx={{ mb: 2 }}
              required
            />
            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.gender} required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={customer.gender}
                onChange={handleChange}
                onBlur={handleBlur}  // Validate on blur
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
              {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" disabled={!isFormValid()}>
              Submit
            </Button>
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

export default CustomerForm;
