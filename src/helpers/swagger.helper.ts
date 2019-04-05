import * as fs from "fs";
import * as vscode from "vscode";
import { serverTSFile, appTSFile, packageFile } from "./templates.helper";
import { checkFileExists } from "./fs.helper";
let rootPath: string;
if (vscode.workspace.workspaceFolders) {
  rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
}
export function createFolderStructure(): void {
  try {
    if (!checkFileExists(rootPath, "src/")) {
      fs.mkdirSync(`${rootPath}/src/`);
    }
    if (!checkFileExists(rootPath, "/src/controllers/")) {
      fs.mkdirSync(`${rootPath}/src/controllers/`);
    }
    if (!checkFileExists(rootPath, "src/models/")) {
      fs.mkdirSync(`${rootPath}/src/models/`);
    }
    if (!checkFileExists(rootPath, "src/routes/")) {
      fs.mkdirSync(`${rootPath}/src/routes/`);
    }
    setupPackageFile();
  } catch (err) {
    console.log(err);
  }
}
export function createServerFile(): void {
  try {
    fs.writeFileSync(`${rootPath}/server.ts`, serverTSFile);
  } catch (err) {
    console.log(err);
  }
}
export function createAppFile(): void {
  try {
    fs.writeFileSync(`${rootPath}/app.ts`, appTSFile);
  } catch (err) {
    console.log(err);
  }
}

function setupPackageFile() {
  try {
    fs.writeFileSync(`${rootPath}/package.json`, packageFile);
  } catch (err) {
    console.log(err);
  }
  vscode.window.createTerminal("swagger-to-node").sendText("npm i");
}
