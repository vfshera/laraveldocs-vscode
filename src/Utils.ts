import * as fs from "fs";
import * as vscode from "vscode";
import path = require("path");
import { DOCS_DIR, HTML_DOCS } from "./constants";

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getName(filename: string) {
  return filename
    .trim()
    .split("-")
    .map((substr) => {
      if (substr !== "-") {
        substr = capitalizeFirst(substr);
      }
      return substr;
    })
    .join(" ");
}

export function capitalizeFirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getDocContents(pathToFile: string) {
  return fs.readFileSync(pathToFile, { encoding: "utf-8" });
}

export function docs() {
  /**
   * Get Versions eg 8.x,9.x
   */
  const versionList: string[] = fs.readdirSync(
    path.join(__dirname, "..", DOCS_DIR)
  );

  return versionList.map((ver) => {
    /**
     * Getting Files in each version folder
     * [{ version: 9.x, files: [...list of .md filenames without extension ]}]
     */

    const versionDir = path.join(__dirname, "..", DOCS_DIR, ver);

    return {
      version: ver,
      files: fs.readdirSync(versionDir).map((fileName) => ({
        title: getName(fileName.split(".")[0]),
        filename: fileName,
        link: path.join(versionDir, fileName),
      })),
    };
  });
}
export function htmlDocs() {
  const versionList: string[] = fs.readdirSync(
    path.join(__dirname, "..", HTML_DOCS)
  );

  return versionList.map((ver) => {
    const versionDir = path.join(__dirname, "..", HTML_DOCS, ver);

    return {
      version: ver,
      files: fs.readdirSync(versionDir).map((fileName) => ({
        title: getName(fileName.split(".")[0]),
        filename: fileName,
        link: path.join(versionDir, fileName),
      })),
    };
  });
}

/**
 * Future WIP
 */

interface WsFiles {
  name: string;
  children?: WsFiles[];
  fileType?: string;
}

function digDir(folderPath: string) {
  const IGNORE_FOLDERS = ["vendor", "node_modules", ".git"];

  return fs.readdirSync(folderPath, { withFileTypes: true }).map((content) => {
    let folderContent: WsFiles = {
      name: content.name,
    };

    if (content.isDirectory() && !IGNORE_FOLDERS.includes(content.name)) {
      folderContent.children = digDir(path.join(folderPath, content.name));
    }

    if (content.isFile()) {
      folderContent.fileType = content.name.split(".").reverse()[0];
    }

    return folderContent;
  });
}
export function isLaravel() {
  const ws = vscode.workspace.workspaceFolders;

  const wsContents:
    | { name: string; uri: vscode.Uri; contents: WsFiles[] }[]
    | undefined = ws?.map((space) => {
    return {
      name: space.name,
      uri: space.uri,
      contents: digDir(space.uri.fsPath),
    };
  });

  console.log(JSON.stringify(wsContents, null, 2));
}
