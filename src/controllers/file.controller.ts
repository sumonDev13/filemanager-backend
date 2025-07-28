import { Request, Response } from 'express';
import File, { IFile } from '../models/file.model.js';
import Folder from '../models/folder.model.js';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folderId } = req.body;
    const userId = req.user?._id;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
    });

    const newFile = new File({
      name: req.file.originalname,
      url: result.secure_url,
      size: result.bytes,
      type: result.resource_type,
      folder: folderId,
      owner: userId,
    });

    await newFile.save();

    // Add file reference to folder
    await Folder.findByIdAndUpdate(folderId, {
      $push: { files: newFile._id },
    });

    res.status(201).json(newFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFiles = async (req: Request, res: Response) => {
  try {
    const { folderId } = req.params;
    const userId = req.user?._id;

    const files = await File.find({ folder: folderId, owner: userId });
    const folders = await Folder.find({ parentFolder: folderId, owner: userId });

    res.status(200).json({ files, folders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add other CRUD operations (delete, rename, move, etc.)