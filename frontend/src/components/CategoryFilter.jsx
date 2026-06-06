import { categories } from "../utils/constants";

function CategoryFilter({ value, onChange }) {
  return (
    <label className="field compact-field">
      <span>Category</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CategoryFilter;
