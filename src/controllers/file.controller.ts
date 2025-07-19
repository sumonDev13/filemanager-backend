import { Request, Response } from 'express';
import File from '../models/file.model.js';

// Note: 'req.user' will be populated by your authentication middleware
// Note: 'req.file' will be populated by Multer middleware

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const { parentFolder } = req.body;
    const user = (req.user as any); 

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const newFile = new File({
      name: req.file.originalname,
      path: req.file.path, 
      mimetype: req.file.mimetype,
      size: req.file.size,
      owner: user.id,
      parentFolder: parentFolder || null,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json({ message: 'Server error during file upload.' });
  }
};