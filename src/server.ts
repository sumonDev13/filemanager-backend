import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import passport from 'passport';

// Load environment variables
dotenv.config();

// Import configurations and routes
import connectDB from './config/db.js';
// import './config/passport'; // Important: This line executes the passport config
// import authRoutes from './routes/auth.routes';


// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Allow requests from our frontend
  credentials: true,
}));

app.use(express.json()); // To parse JSON bodies
app.use(passport.initialize()); // Initialize Passport

// API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/files', fileRoutes);
// app.use('/api/folders', folderRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));