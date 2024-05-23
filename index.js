const path = require("path");
const fs = require("fs");

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

    // Check if there's at least one folder name
    if (folderNames.length > 0) {
      const firstFolderName = folderNames[0]; // Get the name of the first folder
      await createBackendStructure(firstFolderName); // Pass the first folder name to createBackendStructure
      await createMainFile(firstFolderName); // Create the index.js file in the main directory
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

createMainDirectory();

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

// async function createMainFile(mainDirectoryName, mainFileName = "app.js") {
//   const targetDir = path.join(process.cwd(), mainDirectoryName);
//   const mainFilePath = path.join(targetDir, mainFileName);
//   const fileContent = "// Your main file content goes here\n";

//   try {
//     fs.writeFileSync(mainFilePath, fileContent);
//     console.log(`Created file: ${mainFilePath}`);
//   } catch (err) {
//     console.error("Error creating main file:", err);
//   }
// }

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
