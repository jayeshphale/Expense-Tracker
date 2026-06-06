export const categories = ["All", "Food", "Travel", "Shopping", "Bills", "Health", "Entertainment", "Others"];

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});
