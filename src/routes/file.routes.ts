import { Router } from 'express';
import { uploadFile } from '../controllers/file.controller.js';
// import { isAuthenticated } from '../middleware/auth.middleware';
import multer = require('multer');

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Configure storage properly for production

router.post('/upload', upload.single('file'), uploadFile);
// Add routes for delete, edit (rename), etc.
// router.delete('/:fileId', isAuthenticated, deleteFile);
// router.patch('/:fileId', isAuthenticated, renameFile);

export default router;