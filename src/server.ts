// src/server.ts

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser'; // <--- 1. IMPORT COOKIE-PARSER

// Load environment variables
dotenv.config();

// Import configurations and routes
import connectDB from './config/db.js';
import './config/passport.js'; // This initializes passport strategies
import authRouter from './routes/auth.routes.js'; // Renamed to authRouter for clarity

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g., 'http://localhost:3000'
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); // <--- 2. USE COOKIE-PARSER MIDDLEWARE (CRUCIAL)

app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRouter);

// <--- 3. REMOVED THE REDUNDANT /auth/callback route, it's handled by the router now

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));