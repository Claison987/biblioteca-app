import { useEffect, useMemo, useState } from 'react';

const initialBookForm = {
  title: '',
  author: '',
  category: '',
  year: 2024,
};

const initialUserForm = {
  name: '',
  email: '',
};

function App() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, borrowed: 0, users: 0 });
  const [search, setSearch] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [bookForm, setBookForm] = useState(initialBookForm);
  const [userForm, setUserForm] = useState(initialUserForm);

  const fetchData = async () => {
    const [booksResponse, statsResponse, usersResponse] = await Promise.all([
      fetch('/api/books'),
      fetch('/api/stats'),
      fetch('/api/users'),
    ]);

    const booksData = await booksResponse.json();
    const statsData = await statsResponse.json();
    const usersData = await usersResponse.json();

    setBooks(booksData);
    setStats(statsData);
    setUsers(usersData);

    if (!selectedUserId && usersData.length > 0) {
      setSelectedUserId(String(usersData[0].id));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBooks = useMemo(() => {
    const value = search.toLowerCase();

    return books.filter((book) => {
      return (
        book.title.toLowerCase().includes(value) ||
        book.author.toLowerCase().includes(value) ||
        book.category.toLowerCase().includes(value) ||
        (book.borrowerName && book.borrowerName.toLowerCase().includes(value))
      );
    });
  }, [books, search]);

  const handleBookChange = (event) => {
    const { name, value } = event.target;
    setBookForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookForm),
    });

    setBookForm(initialBookForm);
    fetchData();
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userForm),
    });

    setUserForm(initialUserForm);
    fetchData();
  };

  const handleLoanToggle = async (book) => {
    if (book.available && !selectedUserId) {
      alert('Selecione um usuário antes de emprestar um livro.');
      return;
    }

    const endpoint = book.available ? `/api/books/${book.id}/loan` : `/api/books/${book.id}/return`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (book.available) {
      options.body = JSON.stringify({ userId: Number(selectedUserId) });
    }

    await fetch(endpoint, options);
    fetchData();
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Sistema de gestão</p>
          <h1>Biblioteca App</h1>
        </div>

        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Buscar livro, autor, categoria ou usuário"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="user-selector">
            <label htmlFor="user-select">Usuário ativo</label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              {users.map((user) => (
                <option key={user.id} value={String(user.id)}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total de livros</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card available">
          <span>Disponíveis</span>
          <strong>{stats.available}</strong>
        </div>
        <div className="stat-card borrowed">
          <span>Emprestados</span>
          <strong>{stats.borrowed}</strong>
        </div>
        <div className="stat-card users">
          <span>Usuários</span>
          <strong>{stats.users}</strong>
        </div>
      </section>

      <div className="content-grid">
        <aside className="sidebar">
          <section className="panel">
            <h2>Novo livro</h2>
            <form onSubmit={handleBookSubmit} className="book-form">
              <input
                name="title"
                value={bookForm.title}
                onChange={handleBookChange}
                placeholder="Título"
                required
              />
              <input
                name="author"
                value={bookForm.author}
                onChange={handleBookChange}
                placeholder="Autor"
                required
              />
              <input
                name="category"
                value={bookForm.category}
                onChange={handleBookChange}
                placeholder="Categoria"
                required
              />
              <input
                name="year"
                type="number"
                value={bookForm.year}
                onChange={handleBookChange}
                placeholder="Ano"
                min="0"
                required
              />
              <button type="submit">Salvar livro</button>
            </form>
          </section>

          <section className="panel">
            <h2>Novo usuário</h2>
            <form onSubmit={handleUserSubmit} className="book-form">
              <input
                name="name"
                value={userForm.name}
                onChange={handleUserChange}
                placeholder="Nome"
                required
              />
              <input
                name="email"
                type="email"
                value={userForm.email}
                onChange={handleUserChange}
                placeholder="E-mail"
                required
              />
              <button type="submit">Cadastrar usuário</button>
            </form>
          </section>

          <section className="panel">
            <h2>Usuários</h2>
            <div className="user-list">
              {users.map((user) => (
                <button
                  type="button"
                  key={user.id}
                  className={selectedUserId === String(user.id) ? 'user-item active' : 'user-item'}
                  onClick={() => setSelectedUserId(String(user.id))}
                >
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </button>
              ))}
            </div>
          </section>
        </aside>

        <main className="panel main-panel">
          <h2>Catálogo da biblioteca</h2>
          <div className="book-list">
            {filteredBooks.map((book) => (
              <article key={book.id} className="book-card">
                <div className="book-main">
                  <span className="category-tag">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <small>{book.year}</small>
                  {book.borrowerName && (
                    <div className="loan-info">Emprestado para: {book.borrowerName}</div>
                  )}
                </div>

                <div className="book-actions">
                  <span className={book.available ? 'status available' : 'status borrowed'}>
                    {book.available ? 'Disponível' : 'Emprestado'}
                  </span>
                  <button type="button" onClick={() => handleLoanToggle(book)}>
                    {book.available ? 'Emprestar' : 'Devolver'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
