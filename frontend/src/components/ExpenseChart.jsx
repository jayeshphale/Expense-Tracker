import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#0f766e", "#f59e0b", "#2563eb", "#dc2626", "#7c3aed", "#db2777", "#64748b"];

function ExpenseChart({ data }) {
  const hasData = data?.length > 0;

  const chartData = {
    labels: hasData ? data.map((item) => item.category) : ["No data"],
    datasets: [
      {
        data: hasData ? data.map((item) => item.total) : [1],
        backgroundColor: hasData ? colors : ["#d1d5db"],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="panel chart-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Categories</p>
          <h2>Expense chart</h2>
        </div>
      </div>
      <div className="chart-wrap">
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                position: "bottom",
                labels: { usePointStyle: true, boxWidth: 8 }
              }
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    </div>
  );
}

export default ExpenseChart;
