import { Router } from 'express';
import { uploadFile, getFiles } from '../controllers/file.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);
router.get('/:folderId', isAuthenticated, getFiles);

export default router;