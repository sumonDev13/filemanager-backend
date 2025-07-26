import { Router } from 'express';
import {
  createFolder,
  getFolders,
  renameFolder,
  deleteFolder
} from '../controllers/folder.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.use(isAuthenticated);

router.post('/', createFolder);           // Create new folder
router.get('/', getFolders);              // Get folders (optionally by parent)
router.put('/:id', renameFolder);         // Rename folder
router.delete('/:id', deleteFolder);      // Delete folder

export default router;
