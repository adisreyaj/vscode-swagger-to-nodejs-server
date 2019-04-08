import * as fs from "fs";
import * as yaml from "js-yaml";
import * as vscode from "vscode";

export function readYamlFile() {
  let config;
  try {
    if (vscode.workspace.workspaceFolders !== undefined) {
      config = yaml.safeLoad(
        fs.readFileSync(
          `${vscode.workspace.workspaceFolders[0].uri.fsPath}/test.yaml`,
          "utf8"
        )
      );
    }
    
    const indentedJson = JSON.stringify(config, null, 4);
    if (vscode.workspace.workspaceFolders) {
      fs.appendFileSync(
        `${vscode.workspace.workspaceFolders[0].uri.fsPath}/swagger-temp.json`,
        indentedJson
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function checkFileExists(path: string, fileName: string): boolean {
  if (fs.existsSync(`${path}/${fileName}`)) {
    return true;
  } else {
    return false;
  }
}
