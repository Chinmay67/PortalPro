import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogs from './components/AdminLogs';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import { CheckLogin } from '../api/userService';
import { useRecoilState } from 'recoil';
import { checkUser, userAtom } from './atoms/userAtom';
import ThankYou from './components/ThankYou';

const App = () => {
  const [currentUser,setCurrentUser]=useRecoilState(userAtom)
  const [userStatus,setUserStatus]=useRecoilState(checkUser)
  useEffect(()=>{
    const fetchDetails=async()=>{
      const response=await CheckLogin()
      if(response.status<400){
        setUserStatus(true)
        setCurrentUser(response.data.user)
      }
      

    }
    fetchDetails()
  },[])
  useEffect(()=>{
    console.log(currentUser)
    console.log(userStatus)
  },[currentUser,userStatus])
  return (
    <ThemeProvider theme={theme}>
      
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/logs" element={<AdminLogs />} />
          <Route path="/customers/create" element={<CustomerForm />} />
          <Route path="/customers" element={<CustomerDetails />} />
          <Route path="/thank-you" element={<ThankYou/>}/>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
