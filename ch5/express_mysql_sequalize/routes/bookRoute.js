import express from 'express';
import multer from 'multer';
import fs from 'fs';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { title } from 'process';

const router = express.Router();


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter
});

router.get('/', (req, res) => {
  res.render('index', { title: "Home Page" })
});

router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books/', upload.single('image'), createBook);
router.put('/books/:id', upload.single('image'), updateBook);
router.delete('/books/:id', deleteBook);

export default router;