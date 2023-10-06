import * as fs from "fs";
import * as vscode from "vscode";
import path = require("path");

import { Uri, Webview } from "vscode";

/**
 * A helper function which will get the webview URI of a given file or resource.
 *
 * @remarks This URI can be used within a webview's HTML as a link to the
 * given file/resource.
 *
 * @param webview A reference to the extension webview
 * @param extensionUri The URI of the directory containing the extension
 * @param pathList An array of strings representing the path to a file/resource
 * @returns A URI pointing to the file/resource
 */
export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
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

  const wsContents: { name: string; uri: vscode.Uri; contents: WsFiles[] }[] | undefined = ws?.map(
    (space) => {
      return {
        name: space.name,
        uri: space.uri,
        contents: digDir(space.uri.fsPath),
      };
    }
  );

  console.log(JSON.stringify(wsContents, null, 2));
}
