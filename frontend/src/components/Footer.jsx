export default function Footer() {
  return (
    <footer className="main-footer">
      <span>© {new Date().getFullYear()} Expense Tracker — assignment UI.</span>
      <div className="footer-links">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          Vite
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          React
        </a>
      </div>
    </footer>
  );
}
