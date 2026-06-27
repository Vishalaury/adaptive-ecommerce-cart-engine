# Adaptive E-Commerce Cart Engine

A production-ready Shopping Cart Engine built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the project root and add:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Run `npm run dev` to start the development server.

## API Route Specifications

* **POST `/api/users`**: Create a user to generate a `userId`.
* **GET `/api/cart`**: Retrieve the current user's cart. Requires `userid` in request headers.
* **POST `/api/cart/items`**: Add or update an item in the cart. Requires `userid` in request headers. Payload: `{ productId, name, price, quantity }`.
* **GET `/api/checkout/summary`**: Returns the cart contents, subtotal, discount applied, and final checkout amount.

## Rationale for Session Strategy & Promotions

* **Session Strategy**: The application uses a header-based session strategy where the `userid` header identifies each user's cart. This keeps the implementation simple while maintaining complete cart isolation between users.

* **Promotion Strategy**: A tiered discount engine is applied based on cart subtotal:

  * $200 – $499 → 5% Discount
  * $500 – $999 → 10% Discount
  * $1000 and above → 20% Discount

## Feature X: API Rate Limiting

* **What was added**: `express-rate-limit` middleware applied globally to the application.

* **Why**: Rate limiting protects the API from excessive requests, brute-force attacks, and unnecessary database load by limiting each IP to 100 requests every 15 minutes.
