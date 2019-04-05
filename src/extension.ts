import * as vscode from "vscode";
import { readYamlFile } from "./helpers/fs.helper";
import {
  createAppFile,
  createFolderStructure,
  createServerFile
} from "./helpers/swagger.helper";
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "swagger-to-nodejs-generator" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.generateServer",
    () => {
      readYamlFile();
      createFolderStructure();
      createAppFile();
      createServerFile();
      vscode.window.showInformationMessage("Hello World!");
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
