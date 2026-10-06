:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color: #e5eefb;
  background: #06111d;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  background: linear-gradient(135deg, #081827 0%, #0d1f2d 100%);
}

body {
  min-height: 100vh;
}

button, input {
  font: inherit;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 60px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.eyebrow {
  margin: 0;
  color: #7cc3ff;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 8px 0 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.search-box {
  flex: 1;
  max-width: 420px;
}

.search-box input,
.book-form input {
  width: 100%;
  border: 1px solid rgba(159, 196, 255, 0.25);
  background: rgba(11, 23, 35, 0.7);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  color: #eff6ff;
}

.search-box input::placeholder,
.book-form input::placeholder {
  color: #93b5d3;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.stat-card,
.panel {
  background: rgba(13, 29, 43, 0.78);
  border: 1px solid rgba(148, 172, 209, 0.2);
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(6, 19, 29, 0.4);
}

.stat-card {
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-card span {
  color: #a8c6df;
  font-size: 0.9rem;
}

.stat-card strong {
  font-size: 2rem;
}

.stat-card.available strong {
  color: #7af0b1;
}

.stat-card.borrowed strong {
  color: #ffb86c;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(260px, 360px) 1fr;
  gap: 18px;
}

.panel {
  padding: 20px;
}

.panel h2 {
  margin-top: 0;
  margin-bottom: 18px;
}

.book-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.book-form button,
.book-actions button {
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #5aa8ff 0%, #7f7cff 100%);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.book-form button {
  padding: 0.85rem 1rem;
}

.book-form button:hover,
.book-actions button:hover {
  transform: translateY(-1px);
}

.book-list {
  display: grid;
  gap: 12px;
}

.book-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid rgba(146, 183, 230, 0.18);
  border-radius: 16px;
  background: rgba(12, 24, 34, 0.75);
  padding: 16px;
}

.book-card h3 {
  margin: 10px 0 6px;
  font-size: 1.1rem;
}

.book-card p,
.book-card small {
  margin: 0;
  color: #a5bfd6;
}

.category-tag {
  display: inline-block;
  background: rgba(122, 240, 177, 0.12);
  border: 1px solid rgba(122, 240, 177, 0.3);
  color: #9df5c0;
  padding: 0.28rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.book-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.status {
  display: inline-flex;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
}

.status.available {
  background: rgba(122, 240, 177, 0.12);
  color: #8ce9af;
}

.status.borrowed {
  background: rgba(255, 184, 108, 0.12);
  color: #ffbe72;
}

.book-actions button {
  padding: 0.6rem 0.8rem;
}

@media (max-width: 820px) {
  .topbar,
  .content-grid,
  .book-card {
    grid-template-columns: 1fr;
    display: grid;
  }

  .topbar {
    gap: 14px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .book-actions {
    align-items: flex-start;
  }
}
