# Expense Tracker

A polished MERN expense tracker built for the Libra AI Fullstack Developer assignment.

This application helps users securely manage daily spending through expense entry, search, filtering, analytics, and a clean responsive experience.

## Live Deployment

- Frontend: https://expense-tracker-theta-two-38.vercel.app/
- Backend: https://expense-tracker-api-v0du.onrender.com
- GitHub: https://github.com/jayeshphale/Expense-Tracker

## Table of Contents

- [Project Overview](#project-overview)
- [What You Can Do](#what-you-can-do)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [Important Notes](#important-notes)
- [Future Improvements](#future-improvements)
- [Feature Checklist](#feature-checklist)

## Project Overview

Expense Tracker is a full-stack web app built with React on the frontend and Node.js/Express on the backend. The backend stores user and expense data in MongoDB Atlas, and the app is designed for everyday expense tracking with secure authentication, expense analytics, and mobile-friendly design.

## What You Can Do

- Register and login to a personal account.
- Add new expenses with title, amount, category, date, and description.
- Edit or delete existing expenses.
- Search expenses by title, description, or category.
- Filter expenses by category.
- View dashboard summaries for total and monthly spending.
- See recent transactions and category breakdown.
- Toggle light and dark mode.
- Use the application comfortably on desktop, tablet, and mobile screens.

## Key Features

- JWT-based authentication with protected routes
- Expense CRUD operations
- Search and category filtering
- Dashboard analytics and charts
- Responsive UI for all screen sizes
- Dark mode support
- API error handling with helpful messages
- Backend security using Helmet and rate limiting

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express, Helmet, express-rate-limit
- Database: MongoDB Atlas with Mongoose
- Authentication: JSON Web Tokens (JWT)
- Charts: Chart.js, react-chartjs-2
- Styling: custom CSS

## Folder Structure

```
expense-tracker/
+-- backend/
�   +-- controllers/
�   �   +-- authController.js
�   �   +-- expenseController.js
�   +-- middleware/
�   �   +-- authMiddleware.js
�   +-- models/
�   �   +-- Expense.js
�   �   +-- User.js
�   +-- routes/
�   �   +-- authRoutes.js
�   �   +-- expenseRoutes.js
�   +-- .env.example
�   +-- package.json
�   +-- package-lock.json
�   +-- server.js
+-- frontend/
�   +-- public/
�   +-- src/
�   �   +-- assets/
�   �   +-- components/
�   �   +-- pages/
�   �   +-- services/
�   �   +-- utils/
�   +-- package.json
�   +-- package-lock.json
�   +-- vite.config.js
+-- .gitignore
+-- README.md
```

## API Documentation

### Base URL

- Local development: `http://localhost:5000/api`

### Authentication Endpoints

#### `POST /api/auth/register`
Creates a new user account.

Request body:

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "password": "securePassword"
}
```

Response:

- `201 Created`
- JSON containing `user` and `token`

#### `POST /api/auth/login`
Logs in an existing user.

Request body:

```json
{
  "email": "you@example.com",
  "password": "securePassword"
}
```

Response:

- `200 OK`
- JSON containing `user` and `token`

#### `GET /api/auth/me`
Returns the logged-in user profile.

Headers:

- `Authorization: Bearer <token>`

### Expense Endpoints

All expense endpoints require authentication.

#### `GET /api/expenses`
Fetches expenses for the authenticated user.

Query parameters:

- `search` - search by title, description, or category
- `category` - filter by category

#### `GET /api/expenses/:id`
Fetch a single expense by ID.

#### `POST /api/expenses`
Create a new expense.

Request body:

```json
{
  "title": "Groceries",
  "amount": 45.0,
  "category": "Food",
  "date": "2026-06-06",
  "description": "Weekly grocery shopping"
}
```

#### `PUT /api/expenses/:id`
Update an existing expense.

#### `DELETE /api/expenses/:id`
Delete an expense.

#### `GET /api/expenses/dashboard`
Fetch dashboard data for the current user:

- `totalExpenses`
- `totalTransactions`
- `monthlyExpenses`
- `monthlyTransactions`
- `recentTransactions`
- `categoryBreakdown`

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

Copy `backend/.env.example` to `backend/.env` and provide your own values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend

Create `frontend/.env` when using a deployed backend:

```env
VITE_API_URL=https://your-backend-url/api
```

## Running Locally

### Start the backend

```bash
cd backend
npm start
```

### Start the frontend

```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Deployment

### Frontend Deployment

- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to the deployed backend URL

### Backend Deployment

- Start command: `npm start`
- Add environment variables from `backend/.env.example`
- Ensure MongoDB Atlas allows connections from the deployment environment

## Important Notes

- Expenses are user-specific and protected by JWT token middleware.
- Sensitive configuration is kept out of the repository using `backend/.env`.
- Backend security includes Helmet headers and rate limiting.
- The repository is cleaned on the active `main` branch to remove tracked `node_modules` and `.env` files.

## Assumptions

- The backend is deployed at `https://expense-tracker-api-v0du.onrender.com` and is accessible from the internet.
- The frontend is deployed at `https://expense-tracker-theta-two-38.vercel.app/` and uses the backend API URL in `VITE_API_URL`.
- The backend environment includes valid `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `CLIENT_URL` variables.
- `CLIENT_URL` is configured to allow the deployed frontend origin for CORS.
- MongoDB Atlas accepts connections from the deployed backend environment.
- Local development uses `http://localhost:5173` for frontend and `http://localhost:5000` for backend.
- The application expects a modern browser with JavaScript enabled.

## Future Improvements

- Add pagination for expense history
- Add export / download support for CSV or PDF
- Add email verification and password reset
- Add automated tests and CI
- Add more charts for month-to-month trends

## Feature Checklist

- Add Expense
- Edit Expense
- Delete Expense
- View Expense History
- Search Expenses
- Filter by Category
- Dashboard totals and monthly expenses
- Recent transactions
- User Authentication
- Protected routes
- Expense Charts
- Dark Mode
- Responsive UI
- Backend validation
- API error handling
- MongoDB integration
- Deployment-ready scripts
