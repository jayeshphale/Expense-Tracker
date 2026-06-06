# Expense Tracker

A secure, responsive MERN expense tracker built for the Libra AI Fullstack Developer assignment. This project includes authentication, CRUD expense management, search and category filtering, dashboard analytics, charts, and light/dark mode.

## Project Overview

Expense Tracker is a full-stack web application that enables users to:
- Register and login with JWT-based authentication
- Add, edit, delete, and view expense records
- Search expenses by title, description, or category
- Filter expenses by category
- Review a dashboard with total expenses, current month totals, category breakdown, and recent transactions
- Toggle between light and dark mode
- Use a responsive interface on desktop, tablet, and mobile devices

## Features

- ✅ User registration and login
- ✅ Protected routes with JWT authentication
- ✅ Create, read, update, delete (CRUD) expenses
- ✅ Search and category filter
- ✅ Dashboard analytics for total and monthly expense summaries
- ✅ Recent transactions list
- ✅ Expense category chart
- ✅ Responsive UI for mobile, tablet, and desktop
- ✅ Dark mode toggle
- ✅ API error handling and user-friendly error messaging
- ✅ Backend security middleware with helmet and rate limiting

## Tech Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: JSON Web Tokens (JWT)
- Styling: CSS with responsive layout
- Charts: Chart.js via react-chartjs-2
- HTTP client: Axios

## Folder Structure

```
expense-tracker/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Expense.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Screenshots

> Add screenshots of the app here after generating them locally.

- Dashboard view
- Expense history page
- Login / Register page
- Mobile layout

## API Documentation

### Base URL

- Local development: `http://localhost:5000/api`

### Authentication

#### `POST /api/auth/register`
Register a new user.

Request body:
```json
{
  "name": "Your Name",
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
- `201 Created`
- JSON containing `user` and `token`

#### `POST /api/auth/login`
Login with credentials.

Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
- `200 OK`
- JSON containing `user` and `token`

#### `GET /api/auth/me`
Get the authenticated user's profile.

Headers:
- `Authorization: Bearer <token>`

### Expense Endpoints

All expense routes require authentication.

#### `GET /api/expenses`
Fetch expenses with optional query parameters:
- `search` — search by title, description, or category
- `category` — filter by category

#### `GET /api/expenses/:id`
Get a single expense by ID.

#### `POST /api/expenses`
Create a new expense.

Request body:
```json
{
  "title": "Coffee",
  "amount": 3.5,
  "category": "Food",
  "date": "2026-06-06",
  "description": "Morning coffee"
}
```

#### `PUT /api/expenses/:id`
Update an expense.

#### `DELETE /api/expenses/:id`
Delete an expense.

#### `GET /api/expenses/dashboard`
Fetch dashboard metrics:
- totalExpenses
- totalTransactions
- monthlyExpenses
- monthlyTransactions
- recentTransactions
- categoryBreakdown

## Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Environment Variables

### Backend
Create `backend/.env` from `backend/.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend
If deploying to a remote backend, create `frontend/.env`:

```env
VITE_API_URL=https://your-backend-url/api
```

## Running Locally

### Start backend

```bash
cd backend
npm start
```

### Start frontend

```bash
cd frontend
npm run dev
```

Open the frontend at `http://localhost:5173`.

## Deployment Instructions

### Frontend (Vercel)
- Set the build command to `npm run build`
- Set the output directory to `dist`
- Add environment variable `VITE_API_URL` pointing to the deployed backend API

### Backend (Render / similar)
- Use `npm start` as the start command
- Add env vars from `backend/.env.example`
- Ensure MongoDB Atlas is reachable from the deployment service

## Future Improvements

- Add pagination or infinite scroll for expense history
- Add data export (CSV/Excel)
- Add charts for monthly trends
- Add role-based permissions or multi-user support
- Add email verification and password reset
- Add unit and integration tests

## Feature Checklist

- ✅ Add Expense
- ✅ Edit Expense
- ✅ Delete Expense
- ✅ View Expense History
- ✅ Search Expenses
- ✅ Filter by Category
- ✅ Dashboard totals and monthly expenses
- ✅ Recent transactions
- ✅ User Authentication
- ✅ Protected routes
- ✅ Expense Charts
- ✅ Dark Mode
- ✅ Responsive UI
- ✅ Backend validation
- ✅ API error handling
- ✅ MongoDB integration
- ✅ Deployment-ready scripts
