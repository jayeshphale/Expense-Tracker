const Expense = require("../models/Expense");

const getDateRangeForCurrentMonth = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return { start, end };
};

const buildExpenseQuery = (userId, query) => {
  const filters = { userId };

  if (query.category && query.category !== "All") {
    filters.category = query.category;
  }

  if (query.search) {
    const regex = new RegExp(query.search.trim(), "i");
    filters.$or = [{ title: regex }, { description: regex }, { category: regex }];
  }

  return filters;
};

const getExpenses = async (req, res) => {
  const filters = buildExpenseQuery(req.user._id, req.query);
  const expenses = await Expense.find(filters).sort({ date: -1, createdAt: -1 });
  res.json(expenses);
};

const getExpenseById = async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json(expense);
};

const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message || "Unable to create expense" });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message || "Unable to update expense" });
  }
};

const deleteExpense = async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res.json({ message: "Expense deleted successfully" });
};

const getDashboard = async (req, res) => {
  const userId = req.user._id;
  const { start, end } = getDateRangeForCurrentMonth();

  const [totalResult, monthlyResult, recentTransactions, categoryBreakdown] = await Promise.all([
    Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Expense.aggregate([
      { $match: { userId, date: { $gte: start, $lt: end } } },
      { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]),
    Expense.find({ userId }).sort({ date: -1, createdAt: -1 }).limit(5),
    Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ])
  ]);

  res.json({
    totalExpenses: totalResult[0]?.total || 0,
    totalTransactions: totalResult[0]?.count || 0,
    monthlyExpenses: monthlyResult[0]?.total || 0,
    monthlyTransactions: monthlyResult[0]?.count || 0,
    recentTransactions,
    categoryBreakdown: categoryBreakdown.map((item) => ({
      category: item._id,
      total: item.total
    }))
  });
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getDashboard
};
