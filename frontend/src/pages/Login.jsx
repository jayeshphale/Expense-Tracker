import { useState } from "react";
import { authApi, getApiErrorMessage } from "../services/api";

function Login({ onAuth }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = isRegistering ? form : { email: form.email, password: form.password };
      const { data } = isRegistering ? await authApi.register(payload) : await authApi.login(payload);
      onAuth(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Authentication failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-story">
        <div className="brand auth-brand">
          <span>ET</span>
          <div>
            <strong>Expense Tracker</strong>
            <small>MERN finance workspace</small>
          </div>
        </div>
        <div>
          <p className="eyebrow">Assignment ready</p>
          <h1>Control spending with a clean, protected dashboard.</h1>
          <p>
            Manage expenses, review monthly totals, and visualize category-wise spending through a secure account.
          </p>
        </div>
        <div className="auth-proof">
          <div>
            <strong>JWT</strong>
            <span>Protected routes</span>
          </div>
          <div>
            <strong>CRUD</strong>
            <span>Expense workflow</span>
          </div>
          <div>
            <strong>Charts</strong>
            <span>Category insights</span>
          </div>
        </div>
      </section>
      <section className="auth-panel">
        <div>
          <p className="eyebrow">MERN assignment</p>
          <h1>Expense Tracker</h1>
          <p>Track spending, review monthly totals, and keep every transaction tied to your account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-tabs">
            <button type="button" className={!isRegistering ? "active" : ""} onClick={() => setIsRegistering(false)}>
              Login
            </button>
            <button type="button" className={isRegistering ? "active" : ""} onClick={() => setIsRegistering(true)}>
              Register
            </button>
          </div>

          {isRegistering && (
            <label className="field">
              <span>Name</span>
              <input
                required
                minLength="2"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              required
              type="password"
              minLength="6"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
            />
          </label>

          {error && <div className="error-box">{error}</div>}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Please wait..." : isRegistering ? "Create account" : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
