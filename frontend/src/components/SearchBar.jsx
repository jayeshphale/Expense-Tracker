function SearchBar({ value, onChange }) {
  return (
    <label className="field search-field">
      <span>Search expenses</span>
      <input
        type="search"
        value={value}
        placeholder="Search title, category, or notes"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBar;
