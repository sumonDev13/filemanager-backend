// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model.js'; // Only IUser is needed here

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const googleCallback = (req: Request, res: Response) => {
  // Passport attaches the user to req.user after successful authentication
  const user = req.user as IUser;

  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }

  // user._id is from MongoDB, user.id is a virtual getter. Both work.
  // Using user._id is slightly more explicit.
  const token = generateToken(String(user._id));

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict', // or 'lax' if you face issues with cross-site redirects
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Redirect to the frontend dashboard
  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

export const getCurrentUser = (req: Request, res: Response) => {
  // The 'isAuthenticated' middleware has already attached the user to the request.
  // If we reach this controller, we know the user is authenticated.
  res.status(200).json(req.user);
};

export const logout = (req: Request, res: Response) => {
  // To clear a cookie, you set it to an empty value with an expiration date in the past.
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
};