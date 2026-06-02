# Blogforge

A RESTful blogging API where users can register, publish posts, and leave comments. Built with **Node.js**, **Express**, **MongoDB**, and **JWT** authentication.

## Features

- User registration and login with JWT
- Full CRUD for blog posts
- Comments on posts (create, list, delete)
- Password hashing with bcrypt
- Centralized error handling

## Tech stack

- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) running locally or a cloud URI

### Installation

```bash
git clone https://github.com/AayushiMakker/Blogforge.git
cd Blogforge
npm install
```

### Environment variables

Copy the example file and update the values:

```bash
cp .env.example .env
```

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `PORT`           | Server port (default: `3000`)        |
| `MONGO_URI`      | MongoDB connection string            |
| `JWT_SECRET`     | Secret key for signing tokens          |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`)           |

### Run the server

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:3000` (or your `PORT`).

## API overview

Protected routes need this header:

```
Authorization: Bearer <your_jwt_token>
```

### Health check

| Method | Endpoint   | Auth |
| ------ | ---------- | ---- |
| GET    | `/health`  | No   |

### Auth

| Method | Endpoint              | Auth |
| ------ | --------------------- | ---- |
| POST   | `/api/auth/register`  | No   |
| POST   | `/api/auth/login`     | No   |

**Register / login body:**

```json
{
  "name": "Aayushi",
  "email": "you@example.com",
  "password": "yourpassword"
}
```

Login only requires `email` and `password`.

### Posts

| Method | Endpoint           | Auth |
| ------ | ------------------ | ---- |
| GET    | `/api/posts`       | No   |
| GET    | `/api/posts/:id`   | No   |
| POST   | `/api/posts`       | Yes  |
| PUT    | `/api/posts/:id`   | Yes  |
| DELETE | `/api/posts/:id`   | Yes  |

**Create / update body:**

```json
{
  "title": "My first post",
  "content": "Hello, Blogforge!"
}
```

### Comments

| Method | Endpoint                              | Auth |
| ------ | ------------------------------------- | ---- |
| GET    | `/api/posts/:postId/comments`         | No   |
| POST   | `/api/posts/:postId/comments`         | Yes  |
| DELETE | `/api/posts/:postId/comments/:id`     | Yes  |

**Add comment body:**

```json
{
  "text": "Great post!"
}
```

## Project structure

```
├── app.js              # Express app & routes
├── server.js           # Entry point & DB connection
├── src/
│   ├── config/         # Database config
│   ├── controllers/    # Route handlers
│   ├── middlewares/    # Auth & errors
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Helpers
└── .env.example
```

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start with nodemon         |
| `npm start`   | Start with Node            |

## License

This project is licensed under the [MIT License](LICENSE).
