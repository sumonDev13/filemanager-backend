// src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';

// Define the structure of the JWT payload
interface JwtPayload {
  id: string;
}

// Extend the Express Request type to include the user property
// This avoids TypeScript errors when we attach the user to the request
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // *** CRITICAL FIX: Read the JWT from the cookie instead of the Authorization header ***
  if (req.cookies && req.cookies.jwt) {
    try {
      token = req.cookies.jwt;

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // Find the user by the ID from the token payload and attach to the request
      // We exclude the googleId and __v for a cleaner response
      const user = await User.findById(decoded.id).select('-googleId -__v');

      if (!user) {
        // This case handles if a user was deleted but their token is still valid
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach the user object to the request
      req.user = user;

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};