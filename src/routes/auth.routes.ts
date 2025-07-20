import { Router } from 'express';
import passport from 'passport';
import { getCurrentUser, googleCallback, logout } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

// @desc    Auth with Google
// @route   GET /api/auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false , prompt: 'select_account'}));

// @desc    Google auth callback
// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  googleCallback
);

router.get('/me', isAuthenticated, getCurrentUser);

// Logout (for JWT, this is client-side but we can have an endpoint to clear cookies if using them)
router.post('/logout',logout);

export default router;