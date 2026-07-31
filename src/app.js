import express from "express";
import expenseRouter from "./routes/expense.routes.js";
import { handleError } from "./middleware/error.middleware.js";
const app = express();

app.get("/", (req, res) => {
   res.send("<h1>Expense Tracker backend is working...</h1>");
})

app.use("/api/v1/expense", expenseRouter);

app.use(handleError);

export default app;