import * as fs from "fs";
import path = require("path");
import { DOCS_DIR, HTML_DOCS, MD_DOCS } from "../constants";

export function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

/**
 *
 * @returns Gets docs in markdown
 */
export function docs() {
  const versionList: string[] = fs.readdirSync(path.join(__dirname, "..", "..", MD_DOCS));

  return versionList.map((ver) => {
    const versionDir = path.join(__dirname, "..", "..", MD_DOCS, ver);

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
 *
 *  Gets docs in html
 */
export function htmlDocs() {
  console.log("Getting HTML Docs!");

  const versionList: string[] = fs.readdirSync(path.join(__dirname, "..", "..", HTML_DOCS));

  return versionList.map((ver) => {
    const versionDir = path.join(__dirname, "..", "..", HTML_DOCS, ver);

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
