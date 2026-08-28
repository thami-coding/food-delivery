![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Resend](https://img.shields.io/badge/Resend-000000?style=flat-square&logo=resend&logoColor=white)](https://resend.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)


# Food Delivery

A full-stack food delivery platform with real-time order tracking, secure authentication, and integrated payments — built as a single-page application with a layered backend architecture.

**🔗 Live Demo:** [https://food-delivery-ydng-peach.vercel.app](https://food-delivery-ydng-peach.vercel.app)

<br />

## Screenshots
![text](screen-shots/page_1.PNG) ![text](screen-shots/page_2.PNG) ![text](screen-shots/page_3.PNG) ![text](screen-shots/page_4.PNG) ![text](screen-shots/page_5.PNG) ![text](screen-shots/page_6.PNG) ![text](screen-shots/page_7.PNG)
![text](screen-shots/page_8.PNG)

<br />

## Tech Stack

### Frontend
- **React** (Vite) — fast dev server and build tooling
- **TypeScript**
- **Tailwind CSS** — utility-first styling
- **TanStack Query** — server-state management, caching, and data fetching
- **Zod** — runtime schema validation and type inference
- **React Router** — client-side routing (SPA)

### Backend
- **Node.js** with **TypeScript**
- **Express** — REST API framework
- **Layered architecture** (routes → controllers → services → data access)
- **Centralized error handling** — consistent error responses across the API
- **Logging** — structured request/error logging
- **Rate limiting** — applied to authentication endpoints to mitigate brute-force attacks

### Database & Realtime
- **Supabase** (PostgreSQL)
- **Supabase Realtime** — live order status updates pushed to clients

### Payments
- **PayFast** — payment gateway integration for order checkout

<br />

## Features

-  **Authentication** — secure login with HTTP-only cookies, access & refresh token rotation
-  password reset
-  optimistic updates
-  **Rate-limited login** — protects against brute-force login attempts
-  **Order creation & delivery** — full order lifecycle from cart to delivery
-  **Real-time order tracking** — live status updates via Supabase Realtime
-  **Order history** — users can view past orders
-  **Admin dashboard** — manage orders, users, and platform data
-  **PayFast payment integration** — secure checkout flow
-  **Single Page Application (SPA)** — smooth client-side navigation
-  responsive layout
-  **Layered backend architecture** — clear separation of concerns for maintainability
-  **Centralized error handling** — uniform error responses and logging
-  **Logging** — tracks requests and errors for observability

<br />

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- A Supabase project (URL + API keys)
- PayFast merchant credentials (sandbox)

### 1. Clone the repository
```bash
git clone <repo-url>
cd food-delivery
```

### 2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

### 3. Environment variables

**Backend (`backend/.env`)**
```env
PORT=
SUPABASE_DB_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY=
PAYFAST_MERCHATN_ID=
PAYFAST_MERCHATN_KEY=
PAYFAST_PASSPHRASE=
LOGIN_RATE_LIMIT_WINDOW_MS=
LOGIN_RATE_LIMIT_MAX=
```

<br />

**Frontend (`frontend/.env.local`)**
```env
VITE_PAYFAST_MERCHATN_ID=
VITE_PAYFAST_MERCHATN_KEY=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
VITE_BACKEND_URL=

```

### 4. Run the app locally

```bash
# Backend
cd backend
npm run dev

# Frontend (in a separate terminal)
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:3000` by default.

---

## Security Notes

- Refresh tokens are stored in **HTTP-only, secure cookies** — never exposed to client-side JavaScript.
- Access tokens are short-lived and refreshed silently in the background.
- Login endpoints are rate-limited to reduce brute-force risk.
- All input is validated with **Zod** on the client and server.


<br />

## Scripts

| Command | Location | Description |
|---|---|---|
| `npm run dev` | frontend/backend | Start development server |
| `npm run build` | frontend | Build for production |

