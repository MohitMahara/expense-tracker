import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description:
        "A RESTful API for managing personal expenses built with Node.js and Express.",
    },

    servers: [
      {
        url: "http://localhost:8000",
        description: "Development Server",
      },
    ],

    tags: [
      {
        name: "Expense",
        description: "Expense management endpoints",
      },
    ],

    components: {
      schemas: {
        Expense: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: {
              type: "string",
              example: "Netflix Subscription",
            },
            amount: {
              type: "number",
              example: 649,
            },
            category: {
              type: "string",
              example: "Entertainment",
            },
            date: {
              type: "string",
              format: "date",
              example: "2026-07-31",
            },
          },
        },

        CreateExpenseRequest: {
          type: "object",
          required: ["title", "amount", "category", "date"],
          properties: {
            title: {
              type: "string",
              example: "Pizza",
            },
            amount: {
              type: "number",
              example: 250,
            },
            category: {
              type: "string",
              example: "Food",
            },
            date: {
              type: "string",
              format: "date",
              example: "2026-07-31",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Expense not found.",
            },
          },
        },

        ValidationErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Validation Error",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "amount",
                  },
                  message: {
                    type: "string",
                    example: "Amount must be greater than 0.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
