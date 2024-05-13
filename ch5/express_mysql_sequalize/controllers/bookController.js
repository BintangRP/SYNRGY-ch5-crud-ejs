import Book from '../models/bookModel.js';
import fs from 'fs';

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    const booksWithImageUrl = books.map((book) => {
      return {
        ...book.toJSON(),
        image: `http://localhost:5000/assets/uploads/${book.image}`, // URL gambar
      };
    });
    res.json(booksWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  const id = req.params;
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      res.status(404).json({ message: 'Buku tidak ditemukan' });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  const { name, author, price } = req.body;
  const img = req.file;

  try {
    const newBook = await Book.create({ name, author, price, image: img });
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  const id = req.params;
  const { name, author, price } = req.body;
  const img = req.file;

  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    if (!img) return await book.update({ name, author, price });

    await book.save({ name, author, price, image: img });
    res.json({ message: 'Buku berhasil diupdate' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  const img = req.body.image;
  if (!id) return res.status(404).json({ message: 'id tidak ditemukan' });

  try {
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

    fs.unlinkSync(img);
    await book.destroy();
    res.json({ message: 'Buku berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};