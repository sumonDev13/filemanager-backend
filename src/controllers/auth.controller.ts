import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Function to generate a JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const googleCallback = (req: Request, res: Response) => {
  // `req.user` is populated by the passport.authenticate middleware
  const user = req.user as any; 
  
  if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}/login?error=auth_failed`);
  }

  // Generate a JWT for the user
  const token = generateToken(user._id);

  // Redirect back to the frontend, passing the token as a query parameter
  res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
};