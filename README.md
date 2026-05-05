[README.md](https://github.com/user-attachments/files/27397800/README.md)

> A full-stack DSA practice platform built for developers who want to ace coding interviews. Practice problems, track streaks, manage revision notes, and submit code — all in one place.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Environment Variables](#environment-variables)
  - [Seeding the Database](#seeding-the-database)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

PrepForge is a full-stack coding interview preparation platform. It provides a curated library of DSA problems with a built-in Monaco code editor, supports multiple languages, tracks daily streaks, and lets users maintain personal revision notes — all wrapped in a sleek dark-themed UI.

---

## Features

- **Authentication** — JWT-based signup/login with secure password hashing (bcrypt)
- **Problem Library** — 20+ curated DSA problems across Arrays, Strings, Trees, Graphs, DP, and more
- **Code Editor** — Monaco Editor with syntax highlighting for JavaScript, Python, and C++
- **Code Execution** — Run and submit code via local execution or Judge0 API (configurable)
- **Submission Tracking** — Stores all submissions with status, runtime, and memory
- **Progress Dashboard** — Visual breakdown by difficulty and category with a circular progress chart
- **Streak System** — Tracks daily coding streaks and all-time best streak
- **Activity Heatmap** — 180-day contribution grid (similar to GitHub's activity graph)
- **Revision Vault** — Create, edit, search, and tag personal revision notes
- **Responsive Design** — Mobile-friendly navigation with a dark violet-themed UI

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 7 | Build tool & dev server |
| Tailwind CSS 4 | Utility-first styling |
| React Router DOM 7 | Client-side routing |
| Monaco Editor | In-browser code editor |
| Axios | HTTP client |
| Lucide React | Icon library |
| React Hot Toast | Notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Axios | Judge0 API calls |
| dotenv | Environment config |
| Nodemon | Development auto-reload |

---

## Project Structure

```
PrepForge/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js               # Axios instance with interceptors
│   │   ├── components/
│   │   │   ├── auth/                  # Login & Signup pages
│   │   │   ├── dashboard/             # Dashboard component
│   │   │   ├── home/                  # Landing page
│   │   │   ├── layout/                # Navbar & Layout wrapper
│   │   │   ├── problems/              # Problem list & detail with editor
│   │   │   ├── profile/               # User profile page
│   │   │   ├── progress/              # Progress & analytics
│   │   │   ├── revision/              # Revision notes vault
│   │   │   └── streak/                # Streak & activity heatmap
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Global auth state
│   │   ├── App.jsx                    # Route definitions
│   │   ├── main.jsx                   # App entry point
│   │   └── index.css                  # Global styles & Tailwind config
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    ├── config/
    │   └── db.js                      # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── executeController.js        # Local + Judge0 execution
    │   ├── problemController.js
    │   ├── progressController.js
    │   ├── revisionController.js
    │   └── submissionController.js
    ├── middleware/
    │   └── auth.js                    # JWT protect & optionalAuth
    ├── models/
    │   ├── Problem.js
    │   ├── Revision.js
    │   ├── Submission.js
    │   └── User.js
    ├── routes/
    │   ├── auth.js
    │   ├── execute.js
    │   ├── problems.js
    │   ├── progress.js
    │   ├── revision.js
    │   └── submissions.js
    ├── seeds/
    │   └── problems.js                # 20+ seed problems
    ├── temp/                          # Temp files for local execution
    ├── app.js                         # Express server entry
    └── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** v20.19.0 or higher
- **npm** v8 or higher
- **MongoDB** (local instance or MongoDB Atlas URI)
- *(Optional)* **g++** — for C++ local execution
- *(Optional)* **Python 3** — for Python local execution

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# (Edit .env with your values — see Environment Variables section)

# 4. Start the development server
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

### Environment Variables

Create a `.env` file inside the `backend/` directory with the following:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/prepforge

# JWT secret key (use a long random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server port (optional, defaults to 5000)
PORT=5000

# Judge0 API (optional — leave blank to use local execution)
JUDGE0_API_KEY=your_rapidapi_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
```

> **Note:** If `JUDGE0_API_KEY` is not set or is set to `your_rapidapi_key_here`, the server will automatically fall back to local code execution using Node.js, Python, and g++.

---

### Seeding the Database

Populate the database with 20+ curated DSA problems:

```bash
cd backend
npm run seed
```

This will clear existing problems and insert a fresh set covering: Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, Stacks, Sorting, Searching, and Design.

---

## API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/signup` | ❌ | Register a new user |
| POST | `/login` | ❌ | Login and get JWT token |
| GET | `/me` | ✅ | Get current user profile |

### Problem Routes — `/api/problems`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ❌ | List all problems (supports `?difficulty`, `?category`, `?search`) |
| GET | `/categories` | ❌ | Get all distinct categories |
| GET | `/:slug` | ❌ | Get a single problem by slug |

### Submission Routes — `/api/submissions`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Optional | Submit a solution |
| GET | `/me` | ✅ | Get all submissions by the current user |
| GET | `/problem/:problemId` | ✅ | Get submissions for a specific problem |

### Execution Route — `/api/execute`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ❌ | Execute code (body: `{ code, language, stdin }`) |

### Progress Routes — `/api/progress`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard` | ✅ | Get full dashboard stats (streak, breakdown, activity) |

### Revision Routes — `/api/revision`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Create a revision note |
| GET | `/` | ✅ | Get all notes (supports `?search`, `?tag`) |
| PUT | `/:id` | ✅ | Update a note |
| DELETE | `/:id` | ✅ | Delete a note |

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork
   ```bash
   git clone https://github.com/your-username/PrepForge.git
   ```
3. **Create a branch** for your feature or fix
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a **Pull Request** against the `main` branch

### Contribution Ideas

- Add more DSA problems to `backend/seeds/problems.js`
- Improve test case validation logic in the execute controller
- Add a leaderboard or global stats page
- Implement OAuth (GitHub/Google) login
- Add dark/light theme toggle
- Write unit or integration tests

---

## License

This project is licensed under the **ISC License**.

---

<div align="center">
  <strong>Built with ❤️ for the coding community</strong><br/>
  <em>PrepForge — Code. Practice. Excel.</em>
</div>
g README.md…]()
