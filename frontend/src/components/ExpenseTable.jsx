import { currencyFormatter } from "../utils/constants";

function ExpenseTable({ expenses, onEdit, onDelete, deletingId }) {
  if (!expenses.length) {
    return (
      <div className="panel empty-state">
        <h2>No expenses found</h2>
        <p>Add a transaction or adjust your filters to see expense history here.</p>
      </div>
    );
  }

  return (
    <div className="panel table-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">History</p>
          <h2>Expense history</h2>
        </div>
        <span className="count-pill">{expenses.length} records</span>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Expense</th>
              <th>Category</th>
              <th>Date</th>
              <th className="amount-cell">Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td>
                  <strong>{expense.title}</strong>
                  {expense.description && <span>{expense.description}</span>}
                </td>
                <td>
                  <span className="category-chip">{expense.category}</span>
                </td>
                <td>{new Date(expense.date).toLocaleDateString("en-IN")}</td>
                <td className="amount-cell">{currencyFormatter.format(expense.amount)}</td>
                <td>
                  <div className="action-row">
                    <button className="ghost-button" type="button" onClick={() => onEdit(expense)}>
                      Edit
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => onDelete(expense._id)}
                      disabled={deletingId === expense._id}
                    >
                      {deletingId === expense._id ? "Deleting" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
