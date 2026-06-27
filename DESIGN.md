# Architecture and Design Decisions

## Architecture
The application follows a standard Model-View-Controller (MVC) adaptation for APIs (Routes-Controllers-Models). Concerns are strictly separated:
* **Routes**: Handle HTTP verbs and endpoints.
* **Controllers**: Contain the core business logic.
* **Middleware**: Intercepts requests for validation and security.
* **Utils**: Pure functions (like the discount engine) for easy unit testing.

## Schema Decisions
* **Multi-Tenant Isolation**: The `Cart` schema uses a strict `userId` reference to the `User` model, ensuring cart data cannot bleed across tenants.
* **TTL Indexes**: The `Cart` model includes an `expires` index on `updatedAt`. Carts automatically clear after 24 hours of inactivity, saving database storage space.

## Validation Strategy
We use **Joi** at the application layer to enforce strict schema rules before data ever reaches MongoDB. This prevents NoSQL injection and malformed objects, guaranteeing database integrity. Invalid inputs immediately return a structured `400 Bad Request`.

## Edge Cases Considered
* **Quantity Zero**: If an item payload is sent with `quantity: 0`, the ingestion endpoint intelligently removes the item from the array instead of keeping a useless record.
* **Missing Headers**: Requests missing the tenant identifier (`userId`) are immediately blocked with a `401 Unauthorized`.