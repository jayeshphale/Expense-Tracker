import { useState } from "react";
import { categories } from "../utils/constants";

const initialForm = {
  title: "",
  amount: "",
  category: "Food",
  date: new Date().toISOString().slice(0, 10),
  description: ""
};

function ExpenseForm({ editingExpense, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(() => {
    if (!editingExpense) return initialForm;
    return {
      title: editingExpense.title || "",
      amount: editingExpense.amount || "",
      category: editingExpense.category || "Food",
      date: editingExpense.date ? new Date(editingExpense.date).toISOString().slice(0, 10) : initialForm.date,
      description: editingExpense.description || ""
    };
  });
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (form.title.trim().length < 2) nextErrors.title = "Enter at least 2 characters";
    if (!form.amount || Number(form.amount) <= 0) nextErrors.amount = "Enter an amount greater than 0";
    if (!form.date) nextErrors.date = "Choose a date";
    if (!form.category) nextErrors.category = "Choose a category";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      amount: Number(form.amount)
    });

    if (!editingExpense) {
      setForm(initialForm);
    }
  };

  return (
    <form className="panel expense-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Expense entry</p>
          <h2>{editingExpense ? "Edit expense" : "Add expense"}</h2>
        </div>
        {editingExpense && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="form-grid">
        <label className="field">
          <span>Title</span>
          <input value={form.title} onChange={(event) => updateField("title", event.target.value)} />
          {errors.title && <small>{errors.title}</small>}
        </label>

        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            min="1"
            step="0.01"
            value={form.amount}
            onChange={(event) => updateField("amount", event.target.value)}
          />
          {errors.amount && <small>{errors.amount}</small>}
        </label>

        <label className="field">
          <span>Category</span>
          <select value={form.category} onChange={(event) => updateField("category", event.target.value)}>
            {categories
              .filter((category) => category !== "All")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
          {errors.category && <small>{errors.category}</small>}
        </label>

        <label className="field">
          <span>Date</span>
          <input type="date" value={form.date} onChange={(event) => updateField("date", event.target.value)} />
          {errors.date && <small>{errors.date}</small>}
        </label>
      </div>

      <label className="field">
        <span>Description</span>
        <textarea
          rows="3"
          value={form.description}
          maxLength="250"
          onChange={(event) => updateField("description", event.target.value)}
        />
      </label>

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : editingExpense ? "Update expense" : "Add expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
