// lib/multer.js
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  },
});

const upload = multer({ storage });

export default upload;
