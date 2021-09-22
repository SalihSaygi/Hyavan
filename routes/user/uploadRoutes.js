import express from 'express';
const uploadRouter = express.Router();
import {
  deleteFile,
  getFiles,
  getImage,
  getOneFile,
} from '../../controllers/uploadController.js';
uploadRouter.get('/files', getFiles);
uploadRouter.get('/files/:id', getOneFile);
uploadRouter.get('/image/:id', getImage);
uploadRouter.delete('/files/:id', deleteFile);
uploadRouter.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file);
});

export default uploadRouter;
