import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

// Import configurations and routes
import connectDB from './config/db.js';
import './config/passport';
import router from './routes/auth.routes.js';


// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests from our frontend
  credentials: true,
}));

app.use(express.json()); 
app.use(passport.initialize());

// API Routes
app.use('/api/auth', router);

app.get('/test/auth/callback', (req, res) => {
  const token = req.query.token;
  res.send(`<h1>Login successful</h1><p>Your JWT token:</p><pre>${token}</pre>`);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));