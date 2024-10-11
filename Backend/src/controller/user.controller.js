import { logActivity } from '../utils/logger.js';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'

export const googleCallback = async (req, res) => {
  try {
    const { googleId, name, email } = req.user;

    let user = await User.findOne({ where: { googleId } });
    if (!user) {
      user = await User.create({ googleId, name, email });
      await logActivity(user.id, 'User signed up');
    } else {
      await logActivity(user.id, 'User logged in');
    }

    const token = jwt.sign(
    { 
      userId: user.id, 
      isAdmin: user.isAdmin ,
      username:user.name,
      email:user.email,
      googleId:user.googleId
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure:false
    
      
    });
    console.log("logged in successfully")
    res.redirect('http://localhost:5173');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


export const getCurrentUser=async(req,res)=>{
  try {
    const user=req.user
   res.status(201).json({message:"logged in",user})
  } catch (error) {
    res.status(500).send("unable to fetch user")
  }
}



export const logout = (req, res) => {
  // Clear the JWT cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    secure:false, // Set to true in production
  });
  logActivity(req.user.id, "user logged out")
  req.user=null
  // Optionally, redirect to a page after logout
  res.redirect('http://localhost:5173'); // Redirect to your client app (e.g., login page)
};
