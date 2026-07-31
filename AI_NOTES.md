# AI_NOTES.md

# AI Usage Overview

AI was used as an engineering assistant throughout the development of this project. Rather than relying on AI to generate the complete solution, I primarily used it to discuss architecture, compare implementation approaches, evaluate trade-offs, review design decisions, and assist with testing and API documentation before implementing the final solution.

Every suggestion was reviewed against the assignment requirements before being accepted, modified, or rejected.

---

# 1. Which parts of the code were AI-generated vs. written by me

## AI Assisted

AI assisted with:

- discussing the overall project architecture
- comparing different approaches for in-memory data storage
- reviewing REST API endpoint design
- suggesting the initial structure for routes, controllers, and service layers
- discussing validation approaches (manual validation vs. Zod)
- suggesting a centralized error handling approach using a custom `AppError` class
- reviewing algorithmic complexity and data structure choices
- generating initial code drafts that were later reviewed and adapted
- generating the initial integration test suite using **Jest** and **Supertest**
- generating the initial **Swagger/OpenAPI** configuration and endpoint documentation

## Implemented and Finalized by Me

The final implementation was assembled, reviewed, and adapted by me.

This includes:

- selecting the final architecture
- integrating all project components
- modifying AI-generated code where necessary
- implementing validation using Zod
- organizing the project structure
- reviewing every implementation before inclusion
- verifying and refining all generated test cases
- reviewing and restructuring the generated Swagger documentation
- ensuring the project satisfies all assignment requirements

---

# 2. What I validated, tested, or changed in the AI's output

## Storage Structure

### AI's Initial Suggestion

Store expenses inside an array.

### Final Decision

Use an in-memory `Map`.

### Reason

Expenses are uniquely identified by their IDs, making a `Map` a more appropriate data structure.

This provides:

- O(1) average insertion
- O(1) average lookup
- O(1) average deletion

Filtering and aggregation operations still require iteration, but those operations are inherently linear regardless of whether an array or a map is used.

---

## JSON File Storage

### AI's Initial Suggestion

Use a JSON file as the storage mechanism, with file read and write operations to persist expenses.

### Final Decision

Rejected.

### Reason

Although AI suggested using JSON file storage, it required additional file system operations (`fs` read/write), error handling, and synchronization logic, introducing complexity that was not necessary for the assignment. The assignment explicitly allows in-memory storage, and persistence across application restarts was not a requirement.

Using an in-memory `Map` resulted in a simpler implementation while fully satisfying the project requirements. 

---

## Validation

### AI's Initial Suggestion

Perform manual validation inside controllers.

### Final Decision

Use Zod for request validation.

### Reason

Using Zod keeps validation logic centralized, reduces repetitive code, improves readability, and keeps controllers focused on request handling rather than input validation.

---

## API Design

### AI's Suggestion

Use query parameters for filtering instead of creating dedicated endpoints.

### Final Decision

Accepted.

Examples:

```http
GET /api/v1/expense?category=Food

GET /api/v1/expense/total?category=Food
```

### Reason

Query parameters provide a cleaner and more RESTful API while making future extensions easier without changing the endpoint structure.

---

## Service Layer

### AI's Initial Suggestion

Separate methods for retrieving all expenses and retrieving expenses by category.

### Final Decision

Merged the logic into a single service method that accepts an optional category parameter.

### Reason

This removed duplicated logic and simplified the controller implementation while maintaining the same functionality.

---

## Total Expense Calculation

### AI's Initial Suggestion

Filter expenses first and then calculate the total.

### Final Decision

Use a single traversal of the collection.

### Reason

A single iteration avoids creating intermediate collections and performs the calculation with minimal memory overhead.

---

## Test Suite

### AI's Initial Suggestion

Generate an integration test suite using Jest and Supertest.

### Final Decision

Accepted after manual verification and refinement.

### Reason

AI accelerated the creation of the initial test suite. However, every generated test case was manually executed, verified, and refined to ensure it accurately reflected the implemented API behaviour, response structure, validation rules, and expected status codes. Any inconsistencies between the generated tests and the final implementation were corrected before inclusion.

---

## Swagger / OpenAPI Documentation

### AI's Initial Suggestion

Generate the Swagger configuration and endpoint documentation within a single configuration file.

### Final Decision

Modified.

### Reason

The generated implementation placed both the Swagger configuration and endpoint definitions in the same file, making the configuration unnecessarily large and difficult to maintain.

I refactored this approach by keeping only the global Swagger configuration inside `swagger.js` while documenting individual endpoints using **JSDoc** comments with the `swagger-jsdoc` package directly above the corresponding route definitions. This keeps the documentation close to where the routes are defined, improves maintainability, reduces duplication, and results in a cleaner project structure.

---

# 3. AI suggestions that I decided not to use

## Array-Based Storage

### Rejected

Yes.

### Reason

Although arrays satisfy the assignment requirements, they require linear searching when deleting expenses by ID.

A `Map` better represents the application's access pattern because expenses are uniquely identified by their IDs and supports constant-time average lookup and deletion.

---

## Pagination

### Rejected

Yes.

### Reason

Pagination was discussed as a possible enhancement but was intentionally omitted because the assignment explicitly requires viewing all expenses. Adding unnecessary features would increase implementation complexity without providing additional value for the assignment.

---

# Reflection

AI was primarily used as an engineering assistant and technical discussion partner rather than a code generation tool.

Its primary contribution was helping evaluate architectural choices, compare implementation strategies, generate an initial testing framework, and bootstrap API documentation. Every AI-generated output—including application code, tests, and Swagger documentation—was reviewed, validated, and modified where necessary before being included in the final submission.

The final implementation reflects engineering decisions made after critically evaluating AI suggestions rather than accepting them directly.