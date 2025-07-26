import express from 'express';
import cors from 'cors';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import './config/passport.js';
import authRouter from './routes/auth.routes.js'; 
import fileRouter from './routes/file.routes.js';
import folderRouter from './routes/folder.routes.js';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); 

app.use(passport.initialize());

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/files',fileRouter);
app.use('/api/folder',folderRouter);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));