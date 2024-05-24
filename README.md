# Project Setup Script

This script automates the creation of a basic project structure with `backend` and `frontend` directories. It sets up the backend with various subdirectories and installs selected npm packages. The script also initializes a Vite project for the frontend if selected.

## Features

1. **Main Directory Creation**

   - Creates `backend` and `frontend` directories based on user input.

2. **Backend Structure**

   - Creates subdirectories such as `db`, `models`, `routes`, `controllers`, `middlewares`, `utils`, and `validators` within the backend directory.

3. **Frontend Structure**

   - Optionally initializes a Vite project using the `npm create vite@latest` command.

4. **Package Installation**

   - Prompts the user to install selected npm packages for the backend, including `express`, `mongoose`, `cors`, `dotenv`, and others.
   - Installs development dependencies such as `nodemon`.

5. **Main File Creation**

   - Generates an `app.js` file in the backend directory with boilerplate code.
   - Includes import statements for the selected packages.
   - Configures `dotenv` if selected.

6. **Database Connection Setup**

   - Creates a `connectDB.js` file in the `db` directory to handle database connection using Mongoose.

7. **ES Modules Support**
   - Sets the `type` field in `package.json` to `module` to enable ES module syntax.

### Prompts

1. **Main Directory Names**

   - Enter a name for the backend directory (default: `backend`)
   - Enter a name for the frontend directory (default: `frontend`)

2. **Package Installation**
   - Do you want to install `express`? (yes/no)
   - Do you want to install `mongoose`? (yes/no)
   - (and so on for other packages)

### Generated Structure

```plaintext
project-root/
├── backend/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   ├── package.json
├── frontend/ (if Vite is installed)
│   ├── (Vite project structure)
```

### `app.js` Example

If `dotenv` and other packages are selected, `app.js` might look like:

```javascript
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import axios from "axios";
import morgan from "morgan";
import jsonwebtoken from "jsonwebtoken";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
  connectDB();
});
```

## License

This project is licensed under the MIT License.

```

This `README.md` file provides a comprehensive guide on what the script does, how to use it, and what the expected outcomes are. Adjust the details as necessary to fit the specifics of your project and script usage.
```

```

```
