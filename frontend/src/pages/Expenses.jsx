import { useCallback, useEffect, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import SearchBar from "../components/SearchBar";
import { expenseApi, getApiErrorMessage } from "../services/api";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await expenseApi.list({
        search: search || undefined,
        category: category === "All" ? undefined : category
      });
      setExpenses(data);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to load expenses"));
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  useEffect(() => {
    const timer = setTimeout(loadExpenses, 250);
    return () => clearTimeout(timer);
  }, [loadExpenses]);

  const saveExpense = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      if (editingExpense) {
        await expenseApi.update(editingExpense._id, payload);
        setEditingExpense(null);
      } else {
        await expenseApi.create(payload);
      }
      await loadExpenses();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to save expense"));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteExpense = async (id) => {
    const confirmed = window.confirm("Delete this expense?");
    if (!confirmed) return;

    setDeletingId(id);
    setError("");
    try {
      await expenseApi.remove(id);
      if (editingExpense?._id === id) setEditingExpense(null);
      await loadExpenses();
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, "Unable to delete expense"));
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Transactions</p>
          <h1>Expenses</h1>
          <span>Add, edit, search, and filter your complete expense history.</span>
        </div>
        <p>{expenses.length} records loaded</p>
      </header>

      {error && <div className="error-box">{error}</div>}

      <section className="expense-layout">
        <ExpenseForm
          key={editingExpense?._id || "new-expense"}
          editingExpense={editingExpense}
          onSubmit={saveExpense}
          onCancel={() => setEditingExpense(null)}
          submitting={submitting}
        />

        <div className="page-stack">
          <div className="panel filters-panel">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter value={category} onChange={setCategory} />
          </div>
          {loading ? (
            <div className="panel">Loading expenses...</div>
          ) : (
            <ExpenseTable
              expenses={expenses}
              onEdit={setEditingExpense}
              onDelete={deleteExpense}
              deletingId={deletingId}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Expenses;
