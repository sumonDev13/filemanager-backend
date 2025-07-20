import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User,{IUser} from '../models/user.model.js';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as IUser;
  
  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }

  const token = generateToken(user.id);
  
  // Set cookie if using cookies (optional)
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 res.json({      
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};