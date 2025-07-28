import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model.js';

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
  let token: string | undefined;

  // ✅ 1. Try getting token from cookies
  if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  // ✅ 2. If not in cookies, try from Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded.id).select('-googleId -__v');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
