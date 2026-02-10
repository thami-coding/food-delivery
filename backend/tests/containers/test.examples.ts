// example-------------------------------------------------------------------------------------------------------------------
//   it("returns 404 if not found", async () => {})
// })

// describe("DELETE /api/v1/users", () => {
//   it("deletes the user", async () => {})
// })

// describe("POST /users", () => {
//   it("creates a user", async () => {})
//   it("fails with invalid payload", async () => {})
// })

// describe("GET /users/:id", () => {
//   it("returns a user", async () => {})
//   it("returns 404 if not found", async () => {})
// })

// describe("PATCH /users/:id", () => {
//   it("updates user data", async () => {})
// })

// describe("DELETE /users/:id", () => {
//   it("deletes the user", async () => {})
// })

// Role-based access test
// it("returns 403 for non-admin users", async () => {
//  const token = await getAuthToken("user");

//  const response = await request(app)
//    .get("/api/v1/users")
//    .set("Authorization", `Bearer ${token}`);

//  expect(response.status).toBe(403);
// });

// Step 2: Call protected route with token
// ts
// it("returns users when authenticated", async () => {
//   const token = await getAuthToken("admin");

//   const response = await request(app)
//     .get("/api/v1/users")
//     .set("Authorization", `Bearer ${token}`);

//   expect(response.status).toBe(200);
//   expect(() => UsersResponseSchema.parse(response.body)).not.toThrow();
// });

// Create a user + get token
// (usually via login or register)

// ts
// const getAuthToken = async (role = "user") => {
//   const res = await request(app)
//     .post("/api/v1/auth/register")
//     .send({
//       email: "test@test.com",
//       password: "password123",
//       confirmPassword: "password123",
//       role,
//     });

//   return res.body.token;
// };

// Unauthorized request (no token)
// ts
// it("returns 401 if no token is provided", async () => {
//   const response = await request(app).get("/api/v1/users");

//   expect(response.status).toBe(401);
// });

// Text-Content
// expect(response.status).toBe(200);
// expect(response.get("Content-Type")).toMatch(/json/);

// Option 3: Transaction rollback (best practice for SQLite)
// This is actually the cleanest professional solution for SQLite tests.

// Setup once:
// ts
// let queryRunner: QueryRunner;

// beforeEach(async () => {
//   queryRunner = TestDataSource.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();
// });

// afterEach(async () => {
//   await queryRunner.rollbackTransaction();
//   await queryRunner.release();
// });

// tests/
// ├── helpers/
// │   ├── auth.helper.ts
// │   ├── db.helper.ts
// │   └── factories/
// │       └── user.factory.ts
// ├── users/
// │   ├── users.get.test.ts
// │   └── users.post.test.ts
// └── jest.setup.ts

// export const getAuthCookie = async (role: Role = "user") => {
//  const res = await request(app)
//    .post("/api/v1/auth/register")
//    .send({
//      email: "test@test.com",
//      password: "password123",
//      confirmPassword: "password123",
//      role,
//    });

//  return res.headers["set-cookie"][0];  // <- the important part
// };
// Supertest automatically sends the cookie back to the server when you set "Cookie".

// import dotenv from "dotenv"

// dotenv.config({
//   path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
// })

// const isProd = process.env.NODE_ENV === "production";

// res.cookie("Authorization", accessToken, {
//   httpOnly: true,
//   secure: isProd,                    // required for SameSite=None
//   sameSite: isProd ? "none" : "lax", // ✅ critical
//   maxAge: 24 * 60 * 60 * 1000,
// });

// {
//  "scripts": {
//    "test": "NODE_ENV=test jest"
//  }
// }

// project-root/
// ├── src/
// │   ├── app.ts
// │   └── server.ts
// ├── tests/
// │   └── auth.test.ts
// ├── jest.config.ts
// ├── jest.setup.ts
// ├── .env
// ├── .env.test
// └── package.json

// ✅ AAA = Arrange – Act – Assert
// it("logs in a user successfully", async () => {
//  // ✅ Arrange
//  const email = "test@test.com";
//  const password = "test@test";

//  // ✅ Act
//  const res = await request(app)
//    .post("/api/v1/auth/login")
//    .send({ email, password });

//  // ✅ Assert
//  expect(res.status).toBe(200);
//  expect(res.headers["set-cookie"]).toBeDefined();
// });

// cookies
// response.headers["set-cookie"] === ["Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"]
// response.headers["set-cookie"][0] === "Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"

// npx jest --runInBand --detectOpenHandles --verbose
// npx jest --runInBand --detectOpenHandles --verbose
// npx jest tests/products/product.post.test.ts --runInBand

// <img
//   src="https://res.cloudinary.com/demo/image/upload/w_229,h_214/sample.jpg"
//   srcset="
//     https://res.cloudinary.com/demo/image/upload/w_150/sample.jpg 150w,
//     https://res.cloudinary.com/demo/image/upload/w_229/sample.jpg 229w,
//     https://res.cloudinary.com/demo/image/upload/w_300/sample.jpg 300w
//   "
//   sizes="229px"
//   width="229"
//   height="214"
//   alt="Example"
// />

// console.time("setupTestDB")
// // in beforeAll
// await setupTestDB()
// console.timeEnd("setupTestDB")

// Snapshots
// test("snapshot and restore with TypeORM", async () => {
//   const repo = dataSource.getRepository(TestEntity)

//   // Insert initial data
//   await repo.save({ name: "initial data" })

//   // Close DB connections before snapshot
//   await dataSource.destroy()

//   // Take snapshot
//   await container.snapshot()

//   // Reconnect
//   dataSource = createDataSource()
//   await dataSource.initialize()

//   // Insert more data
//   await dataSource.getRepository(TestEntity).save({
//     name: "data after snapshot",
//   })

//   let rows = await dataSource.getRepository(TestEntity).find({
//     order: { id: "ASC" },
//   })

//   expect(rows).toHaveLength(2)

//   // Close connection before restore
//   await dataSource.destroy()

//   // Restore snapshot
//   await container.restoreSnapshot()

//   // Reconnect again
//   dataSource = createDataSource()
//   await dataSource.initialize()

//   rows = await dataSource.getRepository(TestEntity).find({
//     order: { id: "ASC" },
//   })

//   expect(rows).toHaveLength(1)
//   expect(rows[0].name).toBe("initial data")
// })

// OPENAPI
/**
 * @openapi
 * /users/me:
 *   patch:
 *     summary: Update the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "0712345678"
 *               streetAddress:
 *                 type: string
 *                 example: 123 Main Street
 *               city:
 *                 type: string
 *                 example: Nairobi
 *               suburb:
 *                 type: string
 *                 example: Westlands
 *               postalCode:
 *                 type: string
 *                 example: "00100"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: Get the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: success
 *                   user:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin access required)
 */

/**
 * @openapi
 * /users:
 *   delete:
 *     summary: Delete the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongP@ssw0rd
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: StrongP@ssw0rd
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Validation error
 */
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongP@ssw0rd
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many login attempts
 */
/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid email address
 */
/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     summary: Reset user password using reset token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *               - confirmPassword
 *             properties:
 *               token:
 *                 type: string
 *                 example: d9f3c1b2e4a5f6789012
 *               password:
 *                 type: string
 *                 format: password
 *                 example: NewStrongP@ssw0rd
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: NewStrongP@ssw0rd
 *     responses:
 *       200:
 *         description: Password successfully reset
 *       400:
 *         description: Invalid or expired token
 */

// why is short-lived access tokens safer
// Short‑lived (e.g. 5–15 minutes)
// Sent with every API request
// Used to authorize the user
// If stolen → limited damage

// Refresh Token
// Long‑lived (e.g. 7–30 days)
// Used only to get a new access token
// Stored securely (HTTP‑only cookie or DB)
// If expired or revoked → user must log in again

// why is refresh token safer to extend to 7-30 days ?

// what is _retry?
// Short answer:
// _retry is NOT built into Axios.
// It is a custom flag you add yourself.

// Axios doesn’t care about it — you do.

// 3️⃣ Why do we add _retry?
// To prevent infinite loops.

// What happens WITHOUT _retry ❌
// Request → 401
// Interceptor runs → calls /refresh
// Retry original request
// Still 401 (maybe refresh failed)
// Interceptor runs again
// Calls /refresh again
// 🔁 Infinite loop → app freezes
// 4️⃣ What this line actually does
// ts
// originalRequest._retry = true;
// You are saying:

// “I already retried this request once.
// If it fails again with 401, don’t try refreshing again.”

// 5️⃣ How it’s used in logic
// ts
// if (status === 401 && !originalRequest._retry) {
//   originalRequest._retry = true;
//   // try refresh
// }
// Meaning in plain English:
// ✅ First 401 → try refresh
// ❌ Second 401 → stop, logout
// 6️⃣ Why we attach it to originalRequest
// Because:

// Axios passes the same config object through retries
// The flag stays attached
// It survives the retry
// No global variables
// No extra state
// No race conditions

// 7️⃣ Is _retry safe?
// ✅ Yes
// ✅ Common pattern
// ✅ No side effects

// It’s just a property on a JS object.

// 8️⃣ TypeScript note (important)
// TypeScript will complain because _retry isn’t in Axios types.

// Fix it cleanly ✅
// ts
// import { AxiosRequestConfig } from "axios";

// declare module "axios" {
//   export interface AxiosRequestConfig {
//     _retry?: boolean;
//   }
// }
// Now this line is type-safe:

// ts
// originalRequest._retry = true;
// 9️⃣ Analogy (this usually locks it in)
// Imagine a bouncer:

// First time you’re rejected → checks if your ID can be renewed
// Marks your hand (_retry = true)
// If you come back rejected again → no more checks → you’re out

// LOGOUT
// export const logout = async (req: Request, res: Response) => {
//   const refreshToken = req.cookies.refreshToken

//   if (refreshToken) {
//     const decoded = jwt.decode(refreshToken) as { tokenId: string }
//     await db.refreshToken.update({
//       where: { id: decoded.tokenId },
//       data: { revoked: true },
//     })
//   }

//   res.clearCookie("refreshToken")
//   res.sendStatus(204)
// }

// import bcrypt from "bcryptjs"
// import { randomUUID } from "crypto"

// export const refreshToken = async (req: Request, res: Response) => {
//   const refreshToken = req.cookies.refreshToken

//   if (!refreshToken) {
//     return res.status(401).json({ message: "No refresh token" })
//   }

//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET!,
//     ) as {
//       userId: string
//       role: Role
//       tokenId: string
//     }

//     // 1️⃣ Find token in DB
//     const storedToken = await db.refreshToken.findUnique({
//       where: { id: decoded.tokenId },
//     })

//     // 2️⃣ Detect reuse / invalid token
//     if (!storedToken || storedToken.revoked) {
//       // possible token theft → revoke all tokens for user
//       await db.refreshToken.updateMany({
//         where: { userId: decoded.userId },
//         data: { revoked: true },
//       })

//       return res.status(403).json({ message: "Refresh token reuse detected" })
//     }

//     // 3️⃣ Verify hash
//     const isValid = await bcrypt.compare(refreshToken, storedToken.hashedToken)

//     if (!isValid) {
//       return res.status(403).json({ message: "Invalid refresh token" })
//     }

//     // 4️⃣ Revoke old refresh token
//     await db.refreshToken.update({
//       where: { id: decoded.tokenId },
//       data: { revoked: true },
//     })

//     // 5️⃣ Issue new refresh token
//     const newTokenId = randomUUID()

//     const newRefreshToken = generateRefreshToken({
//       userId: decoded.userId,
//       role: decoded.role,
//       tokenId: newTokenId,
//     })

//     await db.refreshToken.create({
//       data: {
//         id: newTokenId,
//         userId: decoded.userId,
//         hashedToken: await bcrypt.hash(newRefreshToken, 10),
//         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//     })

//     // 6️⃣ Issue new access token
//     const newAccessToken = generateAccessToken({
//       userId: decoded.userId,
//       role: decoded.role,
//     })

//     // 7️⃣ Set new refresh token cookie
//     res.cookie("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "strict",
//     })

//     return res.json({ accessToken: newAccessToken })
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid refresh token" })
//   }
// }


// Testing philosophy
// Best‑practice rule you can memorize
// ✅ One it = one user action / behavior
// ✅ One describe = one user journey
// ✅ Use agent to model session

// = the question is not:

// “Is this isolated?”

// The real question is:

// “What level of isolation is appropriate for THIS kind of test?”

// Unit tests
// Fully isolated
// No dependencies
// No shared state

// Integration / E2E flow tests (what you’re writing)
// Model real user behavior
// May share state intentionally
// Isolation is per journey, not per action
// ✅ This is where your current tests live

// describe = one scenario, not one HTTP call
// Login + logout together form one auth session journey
// beforeAll(login) is explicit setup, not test dependency
// Isolation rules depend on test level

// Structure 
// describe("Authentication", () => {
//   describe("POST /api/v1/auth/login", () => {})
//   describe("POST /api/v1/auth/logout", () => {})
//   describe("GET /api/v1/auth/me", () => {})
// })

// Test files
// <resource>.routes.spec.ts

// High‑level rule
// Unit tests live next to the code they test
// Integration tests live separately and mirror the API surface
// Testcontainers = integration tests only

// What “coupling” really means in tests
// Tests are coupled when:

// One test depends on another test having run
// One test depends on shared state created elsewhere
// Test order matters
// Calling multiple API endpoints within the same test is ✅ totally fine.

// my-express-app/
// ├── src/
// │   ├── controllers/
// │   ├── models/
// │   ├── routes/
// │   ├── services/
// │   ├── app.js            <-- Exports the express app (no listen)
// │   └── server.js         <-- Imports app and listens on port
// ├── tests/
// │   ├── integration/      <-- "One endpoint + DB seeding"
// │   │   ├── auth.integration.test.js
// │   │   └── products.integration.test.js
// │   ├── e2e/              <-- "Chained endpoints / User Flows"
// │   │   ├── user-flow.e2e.test.js
// │   │   └── checkout-flow.e2e.test.js
// │   └── helpers/          <-- DB connection/teardown logic
// │       ├── db-handler.js
// │       └── factories.js  <-- Helper to create "User{name: john}"
// ├── package.json
// └── jest.config.js

// That specific string (Expires=Thu, 01 Jan 1970...) is the standard way servers tell a browser to delete a cookie. By setting the expiration date to the past (the Unix Epoch), the browser removes it immediately.


// Use one of these:
// ✅ it('should checkout successfully', ...) (Classic)
// ✅ it('successfully creates an order and clears the cart', ...) (Descriptive)
// ✅ it('throws a 404 error when the product does not exist', ...) (Condition-based)

// Level 1: The Resource (Top Level)
// Name this after the Feature or the Base URL.

// describe('Products Integration')
// describe('/api/v1/products')
// Level 2: The Endpoint (The one you asked about)
// Name this with the HTTP Verb and the Route Path.

// describe('POST /')
// describe('GET /:id')
// Example Structure
// Here is how it should look in your file products.integration.test.ts.

// A describe block should answer “what component is under test?”, not “what happens”.

// Since this is:

// TypeORM
// Repository‑level
// Using Testcontainers
// Testing pagination behavior
// ✅ Recommended options (pick one style)
// API / Infrastructure focused

// ts
// describe('ProductRepository (pagination)', () => {
// ORM‑focused

// ts
// describe('TypeORM Product repository', () => {
// Integration‑explicit (best for your context)

// ts
// describe('Product repository integration', () => {
// ✅ Best choice for strict integration testing:

// ts
// describe('ProductRepository integration', () => {
// 2. Improvements you can make (without changing intent)
// ✅ 1. Assert exact behavior, not just existence
// toBeDefined() adds very little value.

// Instead, assert:

// pagination boundaries
// returned data matches expectations
// ✅ 2. Assert ordering (pagination without order is unstable)
// Pagination must be deterministic.

// Always include order.

// ts
// order: { id: 'ASC' }
// Without this, the test may flake in real DBs.

// ✅ 3. Verify page correctness (not just length)
// You want to ensure page 1 contains the first records.

// ✅ 4. Extract pagination math (readability)
// This improves clarity and reuse.

// 3. Polished Best‑Practice Version ✅
// ts
// describe('ProductRepository integration', () => {
//   it('returns paginated products with total count', async () => {
//     const repo = dataSource.getRepository(Entities.Product)

//     // Arrange
//     await repo.insert(dummyProducts)

//     const page = 1
//     const take = 10
//     const skip = (page - 1) * take

//     // Act
//     const [products, total] = await repo.findAndCount({
//       skip,
//       take,
//       order: { id: 'ASC' }, // ✅ critical for pagination stability
//     })

//     // Assert
//     expect(total).toBe(dummyProducts.length)
//     expect(products).toHaveLength(take)

//     // Optional but strong assertion
//     expect(products[0].id).toBeDefined()
//   })
// })
// ✅ Why this is now “best practice”
// Improvement	Why it matters
// Clear describe name	Makes test output readable & searchable
// Deterministic ordering	Prevents flaky pagination tests
// Strong assertions	Verifies behavior, not implementation
// Repository‑level scope	Correct for integration testing
// Optional Enhancements (If You Want to Go Further)
// ✅ Test page 2 explicitly
// ts
// it('returns the second page correctly', async () => {
//   ...
// })
// ✅ Use beforeEach for data seeding
// ts
// beforeEach(async () => {
//   await repo.insert(dummyProducts)
// })
// ✅ Add a negative case
// ts
// it('returns empty array when page exceeds total', async () => { ... })
// Final Takeaway
// You’re writing high‑quality integration tests already.
// The biggest improvements are:

// better naming
// deterministic ordering
// asserting intent instead of existence
// If you want, I can also:

// Review pagination edge‑case tests
// Extract a reusable pagination test helper
// Show how to validate DB indexes for pagination performance
// GPT-5.2

// Unit Testing – Individual functions (often considered functional at code level)
// Integration Testing – Interactions between components
// System Testing – End‑to‑end workflows
// Smoke Testing – Basic critical functionality
// Regression Testing – Ensures new changes don’t break existing features
// User Acceptance Testing (UAT) – Business validation
// Simple Rule of Thumb
// If a test checks correct behavior against a requirement, it’s functional — regardless of whether it’s unit, integration, or system level.

// Functional Unit Test
// Validates business logic
// Example: “Tax is calculated correctly”
// ❌ Non‑Functional Unit Test
// Performance benchmark
// Memory usage
// Thread safety

// Best‑Practice Guideline
// ✅ 2–3 describe levels max

// This is the smoking gun ✅
// If individual tests are < 200ms, your tests are good.

// Slow tests look like:

// 800ms–2s per test ❌
// Time increasing linearly with number of tests ❌