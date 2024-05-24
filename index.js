#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import inquirer from "inquirer";

async function createMainDirectory() {
  const folders = ["backend", "frontend"];
  const targetDir = process.cwd();
  const folderNames = await promptMainDirectory(inquirer.prompt, folders);
  try {
    folderNames.forEach((folderName) => {
      const destination = path.join(targetDir, folderName);
      fs.mkdirSync(destination);
      console.log(`Created folder: ${destination}`);
    });

    console.log("Main directory structure created successfully!");

    if (folderNames.length > 0) {
      const backendFolderName = folderNames[0];
      const frontendFolderName = folderNames[1];
      await createBackendStructure(backendFolderName);
      const selectedPackages = await promptAndInstallPackages(
        backendFolderName
      );
      await createMainFile(backendFolderName, "app.js", selectedPackages);
      await createConnectDBFile(backendFolderName);

      if (frontendFolderName) {
        const viteTemplate = await promptViteTemplate(inquirer.prompt);
        await createFrontendStructure(frontendFolderName, viteTemplate);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function createBackendStructure(folderName) {
  const folders = [
    "db",
    "models",
    "routes",
    "controllers",
    "middlewares",
    "utils",
    "validators",
  ];
  const targetDir = path.join(process.cwd(), folderName);

  const folderNames = await promptFolderNames(inquirer.prompt, folders);

  try {
    folderNames.forEach((folderName) => {
      const destination = path.join(targetDir, folderName);
      fs.mkdirSync(destination);
      console.log(`Created folder: ${destination}`);
    });

    console.log("Backend structure created successfully!");
  } catch (err) {
    console.error("Error creating backend structure:", err);
  }
}

async function createFrontendStructure(folderName, template) {
  const targetDir = path.join(process.cwd(), folderName);
  try {
    console.log("Creating Vite project...");
    return new Promise((resolve, reject) => {
      exec(
        `npm create vite@latest ${folderName} -- --template ${template}`,
        { cwd: process.cwd() },
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error creating Vite project: ${err}`);
            reject(err);
            return;
          }
          console.log(stdout);
          console.log("Vite project created successfully!");
          resolve();
        }
      );
    });
  } catch (err) {
    console.error("Error creating frontend structure:", err);
  }
}

async function promptAndInstallPackages(folderName) {
  const targetDir = path.join(process.cwd(), folderName);
  const packages = [
    "express",
    "mongoose",
    "cors",
    "dotenv",
    "body-parser",
    "method-override",
    "axios",
    "morgan",
    "jsonwebtoken",
    "zod",
    "bcryptjs",
    "express-validator",
    "cookie-parser",
    "uuid",
    "multer",
  ];

  const devPackages = ["nodemon"];

  const questions = packages.map((pkg) => ({
    type: "confirm",
    name: pkg,
    message: `Do you want to install ${pkg}?`,
    default: true,
  }));

  try {
    const answers = await inquirer.prompt(questions);

    const selectedPackages = packages.filter((pkg) => answers[pkg]);
    if (selectedPackages.length > 0) {
      console.log("Initializing npm and installing packages...");
      return new Promise((resolve, reject) => {
        exec(`npm init -y`, { cwd: targetDir }, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error initializing npm: ${err}`);
            reject(err);
            return;
          }
          exec(
            `npm install ${selectedPackages.join(" ")}`,
            { cwd: targetDir },
            (err, stdout, stderr) => {
              if (err) {
                console.error(`Error installing packages: ${err}`);
                reject(err);
                return;
              }
              console.log("Packages installed successfully!");
              exec(
                `npm install -D ${devPackages.join(" ")}`,
                { cwd: targetDir },
                (err, stdout, stderr) => {
                  if (err) {
                    console.error(`Error installing dev packages: ${err}`);
                    reject(err);
                    return;
                  }
                  console.log("Dev packages installed successfully!");
                  resolve(selectedPackages);
                }
              );
            }
          );
        });
      });
    } else {
      console.log("No packages selected for installation.");
      return Promise.resolve([]);
    }
  } catch (err) {
    console.error("Error installing npm packages:", err);
    return Promise.reject(err);
  }
}

async function promptMainDirectory(prompt, folders) {
  let names = [];
  const questions = folders.map((folder) => ({
    type: "input",
    name: folder,
    message: `Enter a name for the ${folder} directory (default: ${folder})`,
    default: folder,
  }));
  const answers = await prompt(questions);
  folders.forEach((folder) => {
    names.push(answers[folder]);
  });
  return names;
}

async function createMainFile(
  mainDirectoryName,
  mainFileName = "app.js",
  packages = []
) {
  const targetDir = path.join(process.cwd(), mainDirectoryName);
  const mainFilePath = path.join(targetDir, mainFileName);

  const importStatements = packages
    .map((pkg) => {
      if (pkg === "body-parser") {
        return "import bodyParser from 'body-parser';";
      }
      if (pkg === "cookie-parser") {
        return "import cookieParser from 'cookie-parser';";
      }
      if (pkg === "method-override") {
        return "import methodOverride from 'method-override';";
      }
      if (pkg === "express-validator") {
        return "import { body, validationResult } from 'express-validator';";
      }
      return `import ${pkg} from '${pkg}';`;
    })
    .join("\n");

  const dotenvConfig = packages.includes("dotenv")
    ? `import dotenv from 'dotenv';\n\ndotenv.config({ path: './.env' });\n\nconst PORT = process.env.PORT || 3000;\n`
    : `const PORT = process.env.PORT || 3000;\n`;

  const fileContent = `// Your main file content goes here\n${importStatements}\n\nimport connectDB from './db/connectDB';\n\nconst app = express();\n\napp.use(express.urlencoded({ extended: true }));\napp.use(express.static('public'));\napp.use(express.json());\napp.use(cookieParser());\napp.use(morgan('dev'));\n\n${dotenvConfig}app.listen(PORT, () => {\n    console.log(\`App is listening on \${PORT}\`);\n    connectDB();\n});\n`;

  try {
    fs.writeFileSync(mainFilePath, fileContent);
    console.log(`Created file: ${mainFilePath}`);
  } catch (err) {
    console.error("Error creating main file:", err);
  }
}

async function createConnectDBFile(backendFolderName) {
  const targetDir = path.join(process.cwd(), backendFolderName, "db");
  const connectDBFilePath = path.join(targetDir, "connectDB.js");

  const fileContent = `import mongoose from 'mongoose';

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/projectName'")
        .then(() => {
            console.log('Connected to the database');
        })
        .catch((err) => {
            console.error('Error connecting to the database:', err.message);
        });
};

export default connectDB;
`;

  try {
    fs.writeFileSync(connectDBFilePath, fileContent);
    console.log(`Created file: ${connectDBFilePath}`);
  } catch (err) {
    console.error("Error creating connectDB file:", err);
  }
}

async function promptFolderNames(prompt, folders) {
  const questions = folders.map((folder) => ({
    type: "input",
    name: folder,
    message: `Enter a folder name for ${folder} (default: ${folder}):`,
    default: folder,
  }));

  const answers = await prompt(questions);
  return Object.values(answers);
}

async function promptViteTemplate(prompt) {
  const question = {
    type: "list",
    name: "template",
    message: "Choose a Vite template:",
    choices: ["vanilla", "react", "vue", "preact"],
    default: "react",
  };

  const answer = await prompt(question);
  return answer.template;
}

createMainDirectory();
