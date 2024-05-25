#!/usr/bin/env node
import path from "path";
import fs from "fs";
import { exec } from "child_process";
import inquirer from "inquirer";

async function createMainDirectory() {
  const folders = ["frontend"];
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
      const frontendFolderName = folderNames[0];
      if (frontendFolderName) {
        const viteTemplate = await promptViteTemplate(inquirer.prompt);
        await createFrontendStructure(frontendFolderName, viteTemplate);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function createFrontendStructure(folderName, template) {
  const targetDir = path.join(process.cwd(), folderName);
  try {
    console.log("Creating Vite project...");
    await execPromise(
      `npm create vite@latest ${folderName} -- --template ${template}`,
      process.cwd()
    );
    console.log("Vite project created successfully!");

    console.log(`Navigating to ${targetDir} and installing dependencies...`);
    await execPromise("npm install", targetDir);
    console.log("Dependencies installed successfully!");
  } catch (err) {
    console.error("Error creating frontend structure:", err);
  }
}

function execPromise(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${err}`);
        reject(err);
        return;
      }
      console.log(stdout);
      if (stderr) {
        console.error(stderr);
      }
      resolve();
    });
  });
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
