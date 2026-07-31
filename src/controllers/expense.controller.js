import expenseService from "../services/expense.service.js";
import { createExpenseSchema, deleteExpenseSchema } from "../validations/expense.validation.js";

export const addExpense = (req, res, next) => {
  try {
    const parsedData = createExpenseSchema.parse(req.body);
    const expense = expenseService.addExpense(parsedData);

    return res.status(201).json({
      success: true,
      message: "Expense added successfully.",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenses = (req, res, next) => {
  try {
    const { category } = req.query;

    const expenses = expenseService.getExpenses(category);

    return res.status(200).json({
      success: true,
      message : "Expenses fetched successfully",
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

export const getTotalExpenses = (req, res, next) => {
  try {
    const { category } = req.query;

    const total = expenseService.calculateExpensesTotal(category);

    return res.status(200).json({
      success: true,
      message : "Total expenses fetched successfully",
      data: {
        category: category || "All",
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = (req, res, next) => {
  try {
    const { id } = deleteExpenseSchema.parse(req.params);

    expenseService.deleteExpense(id);

    return res.status(200).json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};