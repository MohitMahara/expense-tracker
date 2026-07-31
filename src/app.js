import express from "express";
import expenseRouter from "./routes/expense.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Expense Tracker backend is working...</h1>");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/expense", expenseRouter);

app.use(errorMiddleware);

export default app;
