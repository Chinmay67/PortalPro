import Router from 'express';
import passport from 'passport';
import { getCurrentUser, googleCallback, logout } from '../controller/user.controller.js';
import verifyJWT from '../middleware/auth.middlewares.js';

const router = Router();

router.get('/google', passport.authenticate('google', {
  session:false, scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  session:false,
  failureRedirect: '/' }), googleCallback);
router.get('/checkLogin',verifyJWT,getCurrentUser)
router.get('/logout',verifyJWT,logout)
export default router;
