import { Request, Response } from 'express';
import Folder from '../models/folder.model.js';

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name, parentFolder } = req.body;
    const owner = req.user?._id;

    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }

    const newFolder = await Folder.create({ name, owner, parentFolder });

    res.status(201).json(newFolder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create folder' });
  }
};

export const getFolders = async (req: Request, res: Response) => {
  try {
    const parentFolder = req.query.parentFolder || null;
    const owner = req.user?._id;

    const folders = await Folder.find({ owner, parentFolder });

    res.status(200).json(folders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch folders' });
  }
};

export const renameFolder = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;
    const { name } = req.body;
    const owner = req.user?._id;

    const folder = await Folder.findOneAndUpdate(
      { _id: folderId, owner },
      { name },
      { new: true }
    );

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.status(200).json(folder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to rename folder' });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const folderId = req.params.id;
    const owner = req.user?._id;

    const folder = await Folder.findOneAndDelete({ _id: folderId, owner });

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    res.status(200).json({ message: 'Folder deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete folder' });
  }
};
