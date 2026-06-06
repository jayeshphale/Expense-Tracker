import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

const getStoredUser = () => {
  const user = localStorage.getItem("expense_user");
  return user ? JSON.parse(user) : null;
};

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppShell({ user, onLogout, darkMode, setDarkMode }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="brand" to="/">
          <span>ET</span>
          <div>
            <strong>Expense Tracker</strong>
            <small>Personal finance OS</small>
          </div>
        </Link>
        <nav>
          <NavLink to="/" end>
            <span className="nav-icon">D</span>
            Dashboard
          </NavLink>
          <NavLink to="/expenses">
            <span className="nav-icon">E</span>
            Expenses
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <div className="user-box">
            <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
            <div>
              <strong>{user?.name}</strong>
              <small>{user?.email}</small>
            </div>
          </div>
          <button className="ghost-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>
      <main className="content">
        <Navbar user={user} onLogout={onLogout} darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="page-area">
          <div className="top-strip">
            <div>
              <span className="status-dot"></span>
              Live workspace
            </div>
            <span>{new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "short" })}</span>
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
          </Routes>
        </div>

        <Footer />
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(getStoredUser);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("expense_theme") === "dark");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("expense_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const authHandlers = useMemo(
    () => ({
      onAuth(data) {
        localStorage.setItem("expense_token", data.token);
        localStorage.setItem("expense_user", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/");
      },
      onLogout() {
        localStorage.removeItem("expense_token");
        localStorage.removeItem("expense_user");
        setUser(null);
        navigate("/login");
      }
    }),
    [navigate]
  );

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login onAuth={authHandlers.onAuth} />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute user={user}>
            <AppShell
              user={user}
              onLogout={authHandlers.onLogout}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
