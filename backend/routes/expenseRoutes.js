const express = require("express");
const {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getDashboard
} = require("../controllers/expenseController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/dashboard", getDashboard);
router.get("/", getExpenses);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
