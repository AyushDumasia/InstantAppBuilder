<div style="text-align:center">
  <img src="https://img.shields.io/npm/v/instant-app-setup.svg?style=flat-square" alt="npm version" height="30">
  <img src="https://img.shields.io/npm/dm/instant-app-setup.svg?style=flat-square" alt="npm download" height="30">
  <img src="https://img.shields.io/npm/l/instant-app-setup.svg?style=flat-square" alt="License" height="30">
</div>

<hr>
<br>

````markdown
# instant-app-setup

**instant-app-setup** is a Node.js package for quickly setting up full-stack applications with automated directory creation, package installation, and configuration.

## Features

- **Automated directory setup**
- **Interactive package installation**
- **Backend**: Sets up `index.js` with basic content, connects to database, installs packages (express, mongoose, jwt, bcrypt, morgan, etc.)
- **Frontend**: Installs React (via Vite) or other frameworks (Vanilla, Vue), sets up CSS libraries (Tailwind, Bootstrap, Ant, Sass, MUI, Chakra, etc.)

## Installation

```bash
npm install -g instant-app-setup
```

## Usage

### Full-Stack Project

```bash
build
```

### Backend Only

```bash
build-backend
```

### Frontend Only

```bash
build-frontend
```

Follow the prompts to name your project and select packages.

## MongoDB Setup

1. **Install `mongoose`** in your backend directory:
   ```bash
   npm install mongoose
   ```
2. **Update `index.js` or `server.js`**:

   ```javascript
   import express from "express";
   import mongoose from "mongoose";

   const app = express();

   mongoose
     .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase")
     .then(() => console.log("MongoDB connected"))
     .catch((err) => console.error("MongoDB connection error:", err));

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```
````
