import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const books = [
  {
    id: 1,
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    category: 'Romance',
    year: 1899,
    available: true,
  },
  {
    id: 2,
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    category: 'Infantil',
    year: 1943,
    available: true,
  },
  {
    id: 3,
    title: 'A Revolução dos Bichos',
    author: 'George Orwell',
    category: 'Ficção',
    year: 1945,
    available: false,
  },
  {
    id: 4,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Tecnologia',
    year: 2008,
    available: true,
  },
];

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'API da biblioteca funcionando' });
});

app.get('/api/books', (_req, res) => {
  res.json(books);
});

app.get('/api/stats', (_req, res) => {
  const total = books.length;
  const available = books.filter((book) => book.available).length;
  const borrowed = total - available;

  res.json({ total, available, borrowed });
});

app.post('/api/books', (req, res) => {
  const { title, author, category, year } = req.body;

  if (!title || !author || !category || !year) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  const book = {
    id: Date.now(),
    title,
    author,
    category,
    year: Number(year),
    available: true,
  };

  books.unshift(book);
  return res.status(201).json(book);
});

app.post('/api/books/:id/loan', (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }

  book.available = false;
  return res.json(book);
});

app.post('/api/books/:id/return', (req, res) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return res.status(404).json({ message: 'Livro não encontrado' });
  }

  book.available = true;
  return res.json(book);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
