Certainly! Here's an updated version of the README.md file with instructions on how to use ez-app-builder and examples of creating full-stack projects, as well as backend and frontend individually:

````markdown
# ez-app-builder

![npm version](https://img.shields.io/npm/v/ez-app-builder.svg?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/ez-app-builder.svg?style=flat-square)
![License](https://img.shields.io/npm/l/ez-app-builder.svg?style=flat-square)

ez-app-builder is a Node.js package designed to streamline the process of setting up full-stack applications. It automates the creation of directory structures and offers an interactive interface to install essential npm packages. With ez-app-builder, developers can quickly initialize their projects, saving time and effort in the setup phase.

## Features

- **Automated Directory Structure**: Quickly set up backend and frontend directories with a simple command.
- **Interactive Package Installation**: Choose from a list of essential npm packages to install for your project.
- **Supports Full-Stack Applications**: Build both backend and frontend parts of your application effortlessly.
- **Saves Time and Effort**: Eliminate the manual setup process and get started with your project right away.

## Installation

You can install ez-app-builder globally using npm:

```bash
npm install -g ez-app-builder
```
````

## Usage

Once installed, you can use ez-app-builder commands to create your projects:

- To build your project: `build`
- To build the backend: `build-backend`
- To build the frontend: `build-frontend`

Follow the prompts to customize your project setup and package installations.

## How to Use

### Creating a Full-Stack Project

To create a full-stack project, follow these steps:

1. Run ` build` in your terminal.
2. Enter a name for your project and choose the packages you want to install.
3. The script will create backend and frontend directories with the specified name and install the chosen packages in each directory.
4. You can then customize the backend and frontend as needed for your project.

### Creating Backend Only

To create a backend-only project, follow these steps:

1. Run `build-backend` in your terminal.
2. Enter a name for your backend directory and choose the packages you want to install.
3. The script will create a backend directory with the specified name and install the chosen packages.
4. You can then customize the backend for your project.

### Creating Frontend Only

To create a frontend-only project, follow these steps:

1. Run `build-frontend` in your terminal.
2. Enter a name for your frontend directory and choose the packages you want to install.
3. The script will create a frontend directory with the specified name and install the chosen packages.
4. You can then customize the frontend for your project.

## Customization

- **Project Name**: You can customize the name of your project by entering a different name when prompted.
- **Packages**: Choose the npm packages you want to install for your project. Select from the list of available packages or enter custom package names.

## Setup for MongoDB Configuration

To set up a MongoDB configuration and connect to a MongoDB database in your backend project, follow these steps:

1. Ensure that `mongoose` is included as part of your project dependencies. If not, you can install it using `npm install mongoose` in your backend directory.

2. Update your main backend file (e.g., `index.js` or `server.js`) to import and call the `connectDB` function:

````javascript
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


## Setup for Main File in Backend

The main file in the backend directory is typically named `index.js` or `server.js`. You can customize this file to set up your backend server using Express, Koa, or any other framework of your choice. Here's an example of setting up a basic Express server in `index.js`:

```javascript
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
````

You can further customize this file to add routes, middleware, database connections, etc., based on your project requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

Feel free to adjust the instructions and examples according to your project's specific needs. Once you're satisfied with the README.md file, you can publish your package to npm using the `npm publish` command. Make sure you have an npm account and are logged in before publishing.
```
