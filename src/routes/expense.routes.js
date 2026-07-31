import { Router } from "express";
import {
  addExpense,
  getExpenses,
  getTotalExpenses,
  deleteExpense,
} from "../controllers/expense.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/expense:
 *   post:
 *     tags:
 *       - Expense
 *     summary: Add a new expense
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/CreateExpenseRequest"
 *     responses:
 *       201:
 *         description: Expense added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense added successfully.
 *                 data:
 *                   $ref: "#/components/schemas/Expense"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ValidationErrorResponse"
 */
router.post("/", addExpense);

/**
 * @swagger
 * /api/v1/expense:
 *   get:
 *     tags:
 *       - Expense
 *     summary: Get all expenses
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         example: Food
 *     responses:
 *       200:
 *         description: Expenses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expenses fetched successfully
 *                 count:
 *                   type: number
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Expense"
 */
router.get("/", getExpenses);

/**
 * @swagger
 * /api/v1/expense/total:
 *   get:
 *     tags:
 *       - Expense
 *     summary: Get total expense amount
 *     parameters:
 *       - name: category
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         example: Food
 *     responses:
 *       200:
 *         description: Total expenses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Total expenses fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       example: Food
 *                     total:
 *                       type: number
 *                       example: 550
 */
router.get("/total", getTotalExpenses);

/**
 * @swagger
 * /api/v1/expense/{id}:
 *   delete:
 *     tags:
 *       - Expense
 *     summary: Delete an expense
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Expense deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Expense deleted successfully.
 *       400:
 *         description: Invalid expense ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ValidationErrorResponse"
 *       404:
 *         description: Expense not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ErrorResponse"
 */
router.delete("/:id", deleteExpense);

export default router;
