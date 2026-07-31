import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  amount: z.number().positive("Amount must be greater than 0."),
  category: z.string().trim().min(1, "Category is required."),
  date: z.string().date(),
});

export const deleteExpenseSchema = z.object({
  id: z.uuid("Invalid expense ID."),
});


