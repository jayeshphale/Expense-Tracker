import { NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout, darkMode, setDarkMode }) {
  return (
    <header className="main-navbar">
      <div className="navbar-brand">
        <div>
          <strong>Expense Tracker</strong>
          <small>Manage your money easily</small>
        </div>
        <span className="navbar-user">Hi, {user?.name?.split(" ")[0] || "User"}</span>
      </div>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/expenses">Expenses</NavLink>
      </nav>

      <div className="navbar-actions">
        <button
          className="ghost-button icon-button"
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setDarkMode((value) => !value)}
        >
          {darkMode ? (
            <span aria-hidden="true">☀️</span>
          ) : (
            <span aria-hidden="true">🌙</span>
          )}
        </button>
        <button className="primary-button" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
