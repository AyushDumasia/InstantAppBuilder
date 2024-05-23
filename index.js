#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

async function createMainDirectory() {
  const folders = ["backend", "frontend"];
  const targetDir = process.cwd();
  const { default: inquirer } = await import("inquirer");
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
      await createMainFile(backendFolderName);
      await promptAndInstallPackages(backendFolderName);
      const installVite = await promptInstallVite(inquirer.prompt);
      if (installVite) {
        await createFrontendStructure(frontendFolderName);
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

  const { default: inquirer } = await import("inquirer");

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

async function createFrontendStructure(folderName) {
  const targetDir = path.join(process.cwd(), folderName);
  try {
    console.log("Creating Vite project...");
    return new Promise((resolve, reject) => {
      exec(
        `npm create vite@latest ${folderName} -- --template react`,
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

  const { default: inquirer } = await import("inquirer");

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
                  resolve();
                }
              );
            }
          );
        });
      });
    } else {
      console.log("No packages selected for installation.");
      return Promise.resolve();
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

async function createMainFile(mainDirectoryName, mainFileName = "app.js") {
  const targetDir = path.join(process.cwd(), mainDirectoryName);
  const mainFilePath = path.join(targetDir, mainFileName);
  const fileContent = "// Your main file content goes here\n";

  try {
    fs.writeFileSync(mainFilePath, fileContent);
    console.log(`Created file: ${mainFilePath}`);
  } catch (err) {
    console.error("Error creating main file:", err);
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

async function promptInstallVite(prompt) {
  const question = {
    type: "confirm",
    name: "installVite",
    message: "Do you want to install a Vite app in the frontend directory?",
    default: true,
  };

  const answer = await prompt(question);
  return answer.installVite;
}

createMainDirectory();
