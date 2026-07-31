# Expense Tracker API

## Project Overview

Expense Tracker API is a RESTful backend application built to manage personal expenses. It allows users to add, retrieve, filter, calculate, and delete expenses while using an in-memory JavaScript Map as the storage mechanism, as permitted by the assignment.

This project was developed as part of Diligent's Engineering Apprenticeship 2026 take-home assignment. While the required functionality is relatively straightforward, the primary focus of the implementation was on writing clean, maintainable, and well-structured code by following a layered architecture with proper validation, centralized error handling, comprehensive API testing, and interactive OpenAPI/Swagger documentation.

## Features

- Add a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate total expenses by category
- Delete an expense
- Swagger/OpenAPI documentation

## Tech Stack

- JavaScript (ES Modules)- Node.js
- Express.js
- Zod
- Jest
- Supertest
- Swagger / OpenAPI

## Project Structure

```text
Expense Tracker/
|
+-- src/
|   +-- config/
|   +-- controllers/
|   +-- middleware/
|   +-- routes/
|   +-- services/
|   +-- utils/
|   +-- validations/
|   +-- app.js
|   +-- server.js
|
+-- tests/
+-- README.md
+-- AI_NOTES.md
+-- package.json
+-- package-lock.json
```

## Installation

```bash
npm install
```

## Running the Server

Start the server:

```bash
npm start
```

Start the server in development mode:

```bash
npm run dev
```

## Running Tests

```bash
npm test
```

## API Documentation

Swagger/OpenAPI documentation is included for this project. After starting the server, the interactive API documentation is available at:

```text
http://localhost:8000/api-docs
```

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/expense` | Add a new expense |
| GET | `/api/v1/expense` | View all expenses |
| GET | `/api/v1/expense?category=Food` | Filter expenses by category |
| GET | `/api/v1/expense/total` | Calculate total expenses |
| GET | `/api/v1/expense/total?category=Food` | Calculate total expenses by category |
| DELETE | `/api/v1/expense/:id` | Delete an expense |

## Design Decisions

- In-memory `Map` storage was chosen to keep the assignment lightweight and focused on API design without requiring database setup.
- A Service Layer was used to keep business logic separate from controllers and routes.
- Zod was used for request validation because it provides clear schema definitions and validation errors.
- Global error handling was implemented to keep error responses consistent across the API.
- Swagger/OpenAPI was added to provide interactive documentation and make the API easier to test and review.
