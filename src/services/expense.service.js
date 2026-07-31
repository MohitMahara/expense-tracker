import { randomUUID } from "crypto";
import AppError from "../utils/AppError.js";

class ExpenseService {
  constructor() {
    this.expenses = new Map();
  }

  addExpense(expenseData) {
    const expense = {
      id: randomUUID(),
      ...expenseData,
    };

    this.expenses.set(expense.id, expense);

    return expense;
  }

  getExpenses(category) {
    if (!category) {
      return Array.from(this.expenses.values());
    }

    const filteredExpenses = [];

    for (const expense of this.expenses.values()) {
      if (expense.category.toLowerCase() === category.toLowerCase()) {
        filteredExpenses.push(expense);
      }
    }

    return filteredExpenses;
  }

  calculateExpensesTotal(category) {
    let total = 0;

    for (const expense of this.expenses.values()) {
      if (
        !category ||
        expense.category.toLowerCase() === category.toLowerCase()
      ) {
        total += expense.amount;
      }
    }

    return total;
  }

  deleteExpense(id) {
    if (!this.expenses.has(id)) {
      throw new AppError("Expense not found.", 404);
    }

    this.expenses.delete(id);
  }
}

export default new ExpenseService();