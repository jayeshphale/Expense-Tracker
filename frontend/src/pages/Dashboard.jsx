import { useEffect, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";
import { expenseApi, getApiErrorMessage } from "../services/api";
import { currencyFormatter } from "../utils/constants";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await expenseApi.dashboard();
        setSummary(data);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, "Unable to load dashboard"));
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) return <div className="panel">Loading dashboard...</div>;
  if (error) return <div className="error-box">{error}</div>;

  const topCategory = summary.categoryBreakdown[0];

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Dashboard</h1>
          <span>Track your spend velocity and recent activity in one place.</span>
        </div>
        <p>{new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
      </header>

      <section className="stats-grid">
        <div className="stat-card accent-teal">
          <div className="stat-meta">
            <span>Total expenses</span>
            <b>All time</b>
          </div>
          <strong>{currencyFormatter.format(summary.totalExpenses)}</strong>
          <small>{summary.totalTransactions} transactions</small>
        </div>
        <div className="stat-card accent-amber">
          <div className="stat-meta">
            <span>Monthly expenses</span>
            <b>Current month</b>
          </div>
          <strong>{currencyFormatter.format(summary.monthlyExpenses)}</strong>
          <small>{summary.monthlyTransactions} this month</small>
        </div>
        <div className="stat-card accent-blue">
          <div className="stat-meta">
            <span>Top category</span>
            <b>Highest spend</b>
          </div>
          <strong>{topCategory?.category || "No data"}</strong>
          <small>{topCategory ? currencyFormatter.format(topCategory.total) : "Add expenses to analyze"}</small>
        </div>
      </section>

      <section className="dashboard-grid">
        <ExpenseChart data={summary.categoryBreakdown} />
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Latest</p>
              <h2>Recent transactions</h2>
            </div>
          </div>
          <div className="recent-list">
            {summary.recentTransactions.length ? (
              summary.recentTransactions.map((expense) => (
                <div className="recent-item" key={expense._id}>
                  <div>
                    <strong>{expense.title}</strong>
                    <span>
                      {expense.category} - {new Date(expense.date).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <b>{currencyFormatter.format(expense.amount)}</b>
                </div>
              ))
            ) : (
              <p>No expenses recorded yet.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
