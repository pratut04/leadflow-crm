# LeadFlow CRM

A full-stack Lead Management CRM built using the MERN stack with TypeScript.

---

# Live Demo

Frontend:  
https://leadflow-crm-gilt.vercel.app

Backend:  
https://leadflow-crm-uhnn.onrender.com

---

# Features

## Authentication
- JWT Authentication
- Login/Register
- Protected Routes
- Role Based Access

## Leads Management
- Create Leads
- Update Leads
- Delete Leads
- View Detailed Lead Page

## Dashboard
- Analytics
- Lead Status Charts
- Source Charts
- Team Performance
- Recent Activity

## Advanced Features
- Debounced Search
- Multi Filters
- Pagination
- CSV Export
- Follow-up Notifications
- Follow-up Calendar
- Responsive UI
- Docker Support

---

# Tech Stack

## Frontend
- React
- TypeScript
- TailwindCSS
- React Query
- React Router
- Framer Motion

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication

---

# Folder Structure

```bash
/client   -> Frontend
/server   -> Backend
```

---

# Environment Variables

## Server

Create `.env` inside `server/`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

## Client

Create `.env` inside `client/`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# Installation

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Docker Setup

```bash
docker compose build
docker compose up
```

---

# API Endpoints

## Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

## Leads
- GET `/api/leads`
- POST `/api/leads`
- PUT `/api/leads/:id`
- DELETE `/api/leads/:id`

## Users
- PUT `/api/users/profile`
- PUT `/api/users/change-password`

## Analytics
- GET `/api/analytics`

---

# Roles

## Admin
- Full Access
- Analytics Access
- Delete Leads
- Manage Users

## Sales User
- Manage Assigned Leads
- Update Lead Status

---

# Author

Pratiksha Tivale
