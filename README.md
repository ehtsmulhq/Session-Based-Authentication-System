# Lab Test - User Authentication System

A session-based user authentication web application built with Node.js, Express.js, and MongoDB.

## 👤 Author

**Ehatasam Haque Adib**  
📧 Email: ehatasamul.haque.adib@gmail.com

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Pages](#pages)

---

## 🔍 Overview

A full-stack authentication system that allows users to register with phone number verification, login securely, and access protected pages. The application uses session-based authentication and MongoDB for data persistence.

---

## ✨ Features

### User Authentication

- **Registration** - Create account with phone number, username, password, gender, and date of birth
- **Age Validation** - Users must be at least 15 years old to register
- **Duplicate Prevention** - Phone numbers are unique, preventing duplicate accounts
- **Login** - Authenticate using phone number and password
- **Logout** - Securely destroy session and redirect to login

### Route Protection

- **Protected Routes** - Main page and profile page require authentication
- **Auto Redirect** - Unauthenticated users are redirected to login page
- **Smart Routing** - Logged-in users accessing root (`/`) are redirected to main page

### Session Management

- **Persistent Sessions** - User stays logged in across page navigation
- **User Info API** - Endpoint to fetch current user's data for dynamic display

---

## 🛠️ Tech Stack

| Technology      | Version | Purpose               |
| --------------- | ------- | --------------------- |
| Node.js         | -       | Runtime environment   |
| Express.js      | 5.1.0   | Web framework         |
| MongoDB         | -       | NoSQL database        |
| Mongoose        | 8.19.2  | MongoDB ODM           |
| express-session | 1.18.2  | Session management    |
| body-parser     | 2.2.0   | Request body parsing  |
| dotenv          | 17.2.3  | Environment variables |

---

## 📁 Project Structure

```
Lab Test/
├── server.js           # Main server file with routes
├── package.json        # Dependencies and metadata
├── .env                # Environment variables
├── models/
│   └── User.js         # Mongoose user schema
├── public/
│   └── style.css       # Global stylesheet
└── views/
    ├── register.html   # Registration page
    ├── login.html      # Login page
    ├── main.html       # Main dashboard (protected)
    └── profile.html    # User profile (protected)
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote)

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Lab-Test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create `.env` file**

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/labTestDB
   SESSION_SECRET=mysupersecretkey
   PORT=3000
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on the specified URI

5. **Start the server**

   ```bash
   node server.js
   ```

6. **Access the application**
   Open browser: `http://localhost:3000`

---

## ⚙️ Environment Variables

| Variable         | Description                       | Example                               |
| ---------------- | --------------------------------- | ------------------------------------- |
| `MONGO_URI`      | MongoDB connection string         | `mongodb://127.0.0.1:27017/labTestDB` |
| `SESSION_SECRET` | Secret key for session encryption | `mysupersecretkey`                    |
| `PORT`           | Server port number                | `3000`                                |

---

## 🔗 API Routes

### Public Routes

| Method | Route       | Description                             |
| ------ | ----------- | --------------------------------------- |
| `GET`  | `/`         | Redirect based on authentication status |
| `GET`  | `/register` | Registration page                       |
| `POST` | `/register` | Submit registration (returns JSON)      |
| `GET`  | `/login`    | Login page                              |
| `POST` | `/login`    | Submit login credentials                |

### Protected Routes

| Method | Route       | Description                  |
| ------ | ----------- | ---------------------------- |
| `GET`  | `/main`     | Main dashboard page          |
| `GET`  | `/profile`  | User profile page            |
| `GET`  | `/userinfo` | Get current user data (JSON) |
| `GET`  | `/logout`   | Destroy session and logout   |

### API Responses

**POST `/register`** - Returns JSON:

```json
// Success
{ "success": true, "message": "Registration successful! Redirecting to login..." }

// Error - Age restriction
{ "success": false, "message": "You must be at least 15 years old to register." }

// Error - Duplicate phone
{ "success": false, "message": "Phone number already registered!" }
```

**GET `/userinfo`** - Returns JSON:

```json
{
  "_id": "...",
  "phone": "01234567890",
  "username": "John",
  "gender": "Male",
  "dob": "2000-01-15T00:00:00.000Z"
}
```

---

## 🗄️ Database Schema

### User Model

| Field      | Type   | Required | Unique | Description           |
| ---------- | ------ | -------- | ------ | --------------------- |
| `phone`    | String | ✅       | ✅     | User's phone number   |
| `username` | String | ✅       | ❌     | Display name          |
| `password` | String | ✅       | ❌     | User password         |
| `gender`   | String | ✅       | ❌     | Male / Female / Other |
| `dob`      | Date   | ✅       | ❌     | Date of birth         |

**Collection:** `users`  
**Database:** `labTestDB`

---

## 📄 Pages

### Registration Page (`/register`)

| Field         | Type     | Required | Validation        |
| ------------- | -------- | -------- | ----------------- |
| Phone Number  | Text     | ✅       | Unique            |
| Username      | Text     | ✅       | -                 |
| Password      | Password | ✅       | -                 |
| Gender        | Select   | ✅       | Male/Female/Other |
| Date of Birth | Date     | ✅       | Age ≥ 15          |

- AJAX form submission with JSON response
- Displays success/error messages via alert
- Redirects to login on successful registration

### Login Page (`/login`)

| Field        | Type     | Required |
| ------------ | -------- | -------- |
| Phone Number | Text     | ✅       |
| Password     | Password | ✅       |

- Standard form submission
- Redirects to main page on success

### Main Page (`/main`)

- Displays welcome message with username
- Fetches user data via `/userinfo` endpoint
- Button to navigate to profile page
- Protected route (requires authentication)

### Profile Page (`/profile`)

- Displays "Your Profile" heading
- Logout button
- Protected route (requires authentication)

---

## 📦 Dependencies

```json
{
  "body-parser": "^2.2.0",
  "dotenv": "^17.2.3",
  "express": "^5.1.0",
  "express-session": "^1.18.2",
  "mongoose": "^8.19.2"
}
```

---

## 📝 License

ISC License
