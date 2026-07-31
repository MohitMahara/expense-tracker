import request from "supertest";
import { describe, beforeEach, it, expect } from "@jest/globals";

import app from "../src/app.js";
import expenseService from "../src/services/expense.service.js";

beforeEach(() => {
    expenseService.expenses.clear();
});


describe("POST /api/v1/expense", () => {
  it("should create a new expense", async () => {
    const expense = {
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    };

    const response = await request(app).post("/api/v1/expense").send(expense);

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Expense added successfully.");

    expect(response.body.data).toHaveProperty("id");

    expect(response.body.data.title).toBe(expense.title);

    expect(response.body.data.amount).toBe(expense.amount);

    expect(response.body.data.category).toBe(expense.category);

    expect(response.body.data.date).toBe(expense.date);
  });

  it("should return 400 when title is missing", async () => {
    const response = await request(app).post("/api/v1/expense").send({
      amount: 300,
      category: "Food",
      date: "2026-07-31",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);
  });

  it("should reject an empty title", async () => {
    const response = await request(app).post("/api/v1/expense").send({
      title: "",
      amount: 300,
      category: "Food",
      date: "2026-07-31",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should reject a negative amount", async () => {
    const response = await request(app).post("/api/v1/expense").send({
      title: "Coffee",
      amount: -20,
      category: "Food",
      date: "2026-07-31",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should reject when category is missing", async () => {
    const response = await request(app).post("/api/v1/expense").send({
      title: "Coffee",
      amount: 50,
      date: "2026-07-31",
    });

    expect(response.statusCode).toBe(400);
  });

  it("should reject invalid date", async () => {
    const response = await request(app).post("/api/v1/expense").send({
      title: "Coffee",
      amount: 50,
      category: "Food",
      date: "31/07/2026",
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("GET /api/v1/expense", () => {
  it("should return an empty array when no expenses exist", async () => {
    const response = await request(app).get("/api/v1/expense");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Expenses fetched successfully");

    expect(response.body.count).toBe(0);

    expect(response.body.data).toEqual([]);
  });

  it("should return all expenses", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Netflix",
      amount: 649,
      category: "Entertainment",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense");

    expect(response.statusCode).toBe(200);

    expect(response.body.count).toBe(2);

    expect(response.body.data).toHaveLength(2);
  });

  it("should return only expenses belonging to the requested category", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Burger",
      amount: 300,
      category: "Food",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Spotify",
      amount: 119,
      category: "Entertainment",
      date: "2026-07-31",
    });

    const response = await request(app)
      .get("/api/v1/expense")
      .query({ category: "Food" });

    expect(response.statusCode).toBe(200);

    expect(response.body.count).toBe(1);

    expect(response.body.data[0].category).toBe("Food");
  });

  it("should return an empty array when category does not exist", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Burger",
      amount: 300,
      category: "Food",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense").query({
      category: "Travel",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.count).toBe(0);

    expect(response.body.data).toEqual([]);
  });

  it("should perform case-insensitive category filtering", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense").query({
      category: "food",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.count).toBe(1);

    expect(response.body.data[0].title).toBe("Pizza");
  });
});

describe("GET /api/v1/expense/total", () => {
  it("should return 0 when no expenses exist", async () => {
    const response = await request(app).get("/api/v1/expense/total");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("Total expenses fetched successfully");

    expect(response.body.data.category).toBe("All");

    expect(response.body.data.total).toBe(0);
  });

  it("should calculate the total of all expenses", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Netflix",
      amount: 649,
      category: "Entertainment",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Fuel",
      amount: 500,
      category: "Travel",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense/total");

    expect(response.statusCode).toBe(200);

    expect(response.body.data.category).toBe("All");

    expect(response.body.data.total).toBe(1399);
  });

  it("should calculate the total for a specific category", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Burger",
      amount: 300,
      category: "Food",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    await request(app).post("/api/v1/expense").send({
      title: "Spotify",
      amount: 119,
      category: "Entertainment",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense/total").query({
      category: "Food",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.data.category).toBe("Food");

    expect(response.body.data.total).toBe(550);
  });

  it("should return 0 for an unknown category", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense/total").query({
      category: "Travel",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.data.category).toBe("Travel");

    expect(response.body.data.total).toBe(0);
  });

  it("should calculate total using case-insensitive category matching", async () => {
    await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    const response = await request(app).get("/api/v1/expense/total").query({
      category: "food",
    });

    expect(response.statusCode).toBe(200);

    expect(response.body.data.total).toBe(250);
  });
});

describe("DELETE /api/v1/expense/:id", () => {
  it("should delete an existing expense", async () => {
    const createResponse = await request(app).post("/api/v1/expense").send({
      title: "Pizza",
      amount: 250,
      category: "Food",
      date: "2026-07-31",
    });

    const expenseId = createResponse.body.data.id;

    const deleteResponse = await request(app).delete(
      `/api/v1/expense/${expenseId}`,
    );

    expect(deleteResponse.statusCode).toBe(200);

    expect(deleteResponse.body.success).toBe(true);

    expect(deleteResponse.body.message).toBe("Expense deleted successfully.");

    const getResponse = await request(app).get("/api/v1/expense");

    expect(getResponse.body.count).toBe(0);
    expect(getResponse.body.data).toEqual([]);
  });

  it("should return 404 when expense does not exist", async () => {
    const response = await request(app).delete(
      "/api/v1/expense/550e8400-e29b-41d4-a716-446655440000",
    );

    expect(response.statusCode).toBe(404);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("Expense not found.");
  });
});