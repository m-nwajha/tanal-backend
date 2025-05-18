import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

  // السماح أيضاً لو اسم الملف يحتوي على 'bdf' أو 'word' (بدون اعتبار نوع الميم)
  const filename = file.originalname.toLowerCase();
  if (
    allowedMimeTypes.includes(file.mimetype) ||
    filename.includes('bdf') ||
    filename.includes('word')
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Allowed only images or files containing bdf/word in name'),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
